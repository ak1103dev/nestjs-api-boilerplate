import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@ApiTags('containers')
@Controller('containers')
export class ContainersController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string) {
    const filePath = `storages/${filename}`;
    const existFile = existsSync(filePath);
    if (!existFile) {
      throw new NotFoundException('file not found');
    }
    const file = createReadStream(join(process.cwd(), filePath));
    return new StreamableFile(file);
  }
}
