import { IsOptional, IsString, MaxLength } from 'class-validator'
import { Body, Get, JsonController, Param, Post, Put } from 'routing-controllers'
import { OperationInfo, ResponseEntry, Parameters, Model, Property } from 'routing-controllers-openapi-extended';

@Model()
export class CreateUserBody {
  @IsString()
  @Property()
  name: string

  @IsOptional()
  @MaxLength(20, { each: true })
  @Property({ itemType: Boolean })
  hobbies: string[]

}

@JsonController('/users')
export class UsersController {

  @Get('/:id')
  @OperationInfo({ summary: '', description: '', operationId: '' })
  @OperationInfo({ summary: 'Get user by Id', description: 'Get user by Id' })
  getOne(@Param('id') id: number) {
    return { name: 'User #' + id }
  }

  
  @Post('/:id')
  @Parameters([
    { name: 'Authorization', in: 'header', type: 'string', description: 'Used to attached token', required: true, default: 'Basic <token>' },
    { name: 'body', description: 'Detailed information about creat user body', required: true },
    { name: 'id', description: 'Detailed information about id parameter' },
  ])
  @ResponseEntry({ statusCode: 200, schema: CreateUserBody, description: 'detailed information about the response', examples: { 'applications/json': { userId: '<sample data>' } } })
  createUser(@Body() body: CreateUserBody, @Param('id') id: string) {
    return { ...body, id: 3 }
  }

}
