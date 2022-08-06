import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application  from '@ioc:Adonis/Core/Application';

import {v4 as uuidv4} from "uuid"

import Moment from 'App/Models/Moment'
export default class MomentsController {

  private validationImageOptions = {
    types: ['image'],
    size: '2mb'
  }

  public async index(){
    const moments = await Moment.all()

    return {moments}
  }

  public async show(ctx: HttpContextContract){
    const id = ctx.params.id

    const moment = await Moment.findOrFail(id)

    return {data: moment}
  }

  public async store(ctx: HttpContextContract){
    const body = ctx.request.body()

    if(!body.title || !body.description){
      return {message: "field title or description empty!"}
    }else{

      const image = ctx.request.file('image', this.validationImageOptions)
  
      if(image){
        const imageName = `${uuidv4()}.${image.extname}`
  
        await image.move(Application.tmpPath('uploads'),{
          name: imageName
        })
  
        body.image = imageName
      }
  
      const moment = await Moment.create(body)
      
      ctx.response.status(201)
  
      return {message: "Moment successfully created!", data: moment}
    }
  }

  public async update(ctx: HttpContextContract){
    const body = ctx.request.body()

    const id = ctx.params.id

    const moment = await Moment.findOrFail(id)

    
    moment.title = body.title
    moment.description = body.description
    
    if(moment.image !== body.image || !moment.image){
      const image = ctx.request.file('image', this.validationImageOptions)

      if(image){

        const imageName = `${uuidv4()}.${image.extname}`
    
        await image.move(Application.tmpPath('uploads'),{
          name: imageName
        })
  
        moment.image = imageName
      }
    }

    await moment.save()

    return{
      message: "Moment successfully updated!",
      data: moment
    }
  }

  public async destroy(ctx: HttpContextContract){
    const id = ctx.params.id

    const moment = await Moment.findOrFail(id)

    await moment.delete()

    return {message: 'Moment successfully deleted!', data: moment}
  }
}
