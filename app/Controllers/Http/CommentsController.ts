import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Moment from 'App/Models/Moment'
import Comment from 'App/Models/Comment'

export default class CommentsController {

  public async index(ctx: HttpContextContract){
    const momentId = ctx.params.momentId

    const moment = await Moment.findOrFail(momentId)

    await moment.load("comments")

    return {data: moment}

  }

  public async show(ctx: HttpContextContract){
    const id = Number(ctx.params.id)
    const momentId = ctx.params.momentId

    const moment = await Moment.findOrFail(momentId)

    await moment.load("comments")

    return {data: moment.comments.filter(comment=>
      comment.id === id
      )}
  }

  public async store(ctx: HttpContextContract){
    const body = ctx.request.body()
    const momentId = ctx.params.momentId

    await Moment.findOrFail(momentId)

    body.momentId = momentId

    const comment = await Comment.create(body)

    ctx.response.status(201)

    return{message:'Comment successfully created!', data: comment}
  }

  public async update(ctx: HttpContextContract){
    const id = ctx.params.id
    const body = ctx.request.body()

    const comment = await Comment.findOrFail(id)

    comment.text = body.text

    await comment.save()

    return {
      message: "Comment successfully updated!",
      data: comment
    }

  }

  public async destroy(ctx: HttpContextContract){
    const id = ctx.params.id

    const comment = await Comment.findOrFail(id)

    await comment.delete()

    return {message: 'Comment successfully deleted!', data: comment}

  }
}
