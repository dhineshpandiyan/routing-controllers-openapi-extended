import { IsOptional, IsString, MaxLength } from 'class-validator'
import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put
} from 'routing-controllers'
// import { OpenAPI } from 'routing-controllers-openapi';
import { PathEntry, CustomEntry } from 'routing-controllers-openapi-extended';

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
  @PathEntry({ summary: 'Path entry summary', description: 'Path entry description' })
  @CustomEntry({ a: 'one', b: 'two' })
  getOne(@Param('id') id: number) {
    return { name: 'User #' + id }
  }

  // @Post('/')
  // createUser(@Body({ validate: true }) body: CreateUserBody) {
  //   return { ...body, id: 3 }
  // }

  // @Put('/')
  // createManyUsers(@Body({ type: CreateUserBody }) body: CreateUserBody[]) {
  //   return {}
  // }
}
