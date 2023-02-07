export interface PostInterface {
    id: string
    creator: CreatorInterface
    text: string
    mediaUrl: string
    mediaType: string
    likeCount: number
    likedByUser: boolean
    type: string
    replyCount: number
}

export interface CreatorInterface {
    id: string
    userName: string
    firstName: string
    lastName: string
    avatarUrl: string
}

export interface ResponseInterface<T> {
    data: T[]
    count: number
}
