import { Body, Get, JsonController, Param, Post } from 'routing-controllers'
import { OperationInfo, ResponseEntry, Parameters, Model, Property } from 'routing-controllers-openapi-extended';

@Model()
export class CreateUserBody {
  
  @Property({ description: 'Name of the user'})
  name: string

  @Property({ itemType: String, description: 'List of user hobbies' })
  hobbies: string[]

}

@JsonController('/users')
export class UsersController {

  @Get('/:id')
  @OperationInfo({ summary: 'Get user by Id', description: 'Get user by Id' })
  @ResponseEntry({ statusCode: 200, schema: CreateUserBody, description: 'Retrived user by the supplied user id', examples: { 'applications/json': { userId: '<sample data>' } } })
  getOne(@Param('id') id: number) {
    return { name: 'User #' + id }
  }

  
  @Post('/:id')
  @Parameters([
    { name: 'Authorization', in: 'header', type: 'string', description: 'Used to attached token', required: true, default: 'Basic <token>' },
    { name: 'body', description: 'Detailed information about creat user body', required: true },
    { name: 'id', description: 'Detailed information about id parameter' },
  ])
  @ResponseEntry({ statusCode: 200, schema: CreateUserBody, description: 'Information about created user', examples: { 'applications/json': { userId: '<sample data>' } } })
  createUser(@Body() body: CreateUserBody, @Param('id') id: string) {
    return { ...body, id: 3 }
  }

}
