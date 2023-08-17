import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {

    constructor(private prisma: PrismaService) { }

    async createBookmark(userId: number, createBookmarkDto: CreateBookmarkDto) {
        try {
            return await this.prisma.bookmark.create({
                data: {
                    userId,
                    ...createBookmarkDto
                }
            })
        } catch (e) {
            throw new ForbiddenException('Link already exists');
        }
    }

    getBookmarks(userId: number) {
        return this.prisma.bookmark.findMany({
            where: {
                userId
            }
        });
    }
    
    getBookmarkById(userId: number, bookmarkId: number) {
        return this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        });
    }
    
    async updateBookmarkById(userId: number, editBookmarkDto: EditBookmarkDto, bookmarkId: number) {
        
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        });

        if(!bookmark || bookmark.userId !== userId) {
            throw new Error('Bookmark not found');
        }
        return await this.prisma.bookmark.update({
            where: {
                id: bookmarkId
            },
            data: {
                ...editBookmarkDto
            }
        });

    }

    async deleteBookmarkById(userId: number, bookmarkId: number) {
        try {
            await this.prisma.bookmark.delete({
                where: {
                    id: bookmarkId
                }
            });
        } catch (e) {
            throw new ForbiddenException('Bookmark not found');
        }
    }
}
