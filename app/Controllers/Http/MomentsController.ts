import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Moment from 'App/Models/Moment'
export default class MomentsController {

  public async index(){
    const moments = await Moment.all()

    return {moments}
  }

  public async show(){
    
  }

  public async store(ctx: HttpContextContract){
    const body = ctx.request.body()

    const moment = await Moment.create(body)
    
    ctx.response.status(201)

    return {message: "Moment successfully created!", data: moment}
  }

  public async update(){

  }

  public async destroy(){
    
  }
}
