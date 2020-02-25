import { IsOptional, IsString, MaxLength } from 'class-validator'
import { Body, Get, JsonController, Param, Post, Put } from 'routing-controllers'
import { OperationInfo } from 'routing-controllers-openapi-extended';

class CreateUserBody {
  @IsString()
  name: string

  @IsOptional()
  @MaxLength(20, { each: true })
  hobbies: string[]

}

@JsonController('/users')
export class UsersController {

  @Get('/:id')
  @CodeSnippets()
  @OperationInfo({ summary: '', description: '', operationId: '' })
  @OperationInfo({ summary: 'Get user by Id', description: 'Get user by Id' })
  getOne(@Param('id') id: number) {
    return { name: 'User #' + id }
  }

  @Post('/')
  createUser(@Body({ validate: true }) body: CreateUserBody) {
    return { ...body, id: 3 }
  }

}
