import { GetServerSideProps, InferGetStaticPropsType } from "next";
import {
  ActionType,
  Avatar,
  AvatarSize,
  Button,
  ButtonColors,
  Card,
  Heading,
  HeadingColors,
  HeadingTags,
  IconLink,
  IconLinkColors,
  InteractionButton,
  Label,
  LabelSizes,
  Link,
  Paragraph,
  ParagraphSizes,
  SvgProfile,
  SvgSend,
  SvgTime,
  SvgUpload,
  Textarea,
} from "@smartive-education/design-system-component-library-lobsome";
import { PostInterface, ResponseInterface } from "./post.interface";

type PageProps = { posts: ResponseInterface<PostInterface> };

export default function PageHome({
  posts,
}: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  return (
    <>
      <div className="bg-slate-100 flex justify-center ">
        <div className="w-[680px]">
          <div className="py-8">
            <Heading color={HeadingColors.VIOLET} tag={HeadingTags.HEADING2}>
              Willkommen auf Mumble
            </Heading>
            <Heading color={HeadingColors.SLATE} tag={HeadingTags.HEADING4}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem,
              exercitationem.
            </Heading>
          </div>

          <div className="space-y-4">
            {posts.data.map((post) => (
              <Card key={post.id}>
                <div className="absolute -left-8 top-4">
                  <Avatar
                    alt="Portrait of Matilda"
                    showBorder
                    size={AvatarSize.M}
                    src={post.creator.avatarUrl}
                  />
                </div>
                <div className="mb-1">
                  <Label size={LabelSizes.m}>Damian Caduff</Label>
                </div>
                <div className="flex space-x-5 mb-6">
                  <IconLink color={IconLinkColors.VIOLET} label="damiancaduff">
                    <SvgProfile />
                  </IconLink>
                  <IconLink color={IconLinkColors.SLATE} label="vor 17 Minuten">
                    <SvgTime />
                  </IconLink>
                </div>
                <div className="mb-6">
                  <Paragraph size={ParagraphSizes.m}>
                    Laoreet tincidunt vulputate in commodo. Sed vestibulum
                    interdum sed neque.
                  </Paragraph>
                </div>
                <div className="flex space-x-1 mb-8">
                  <Link>#casfee</Link>
                  <Link>#goOST</Link>
                  <Link>#smartive</Link>
                </div>
                <div className="flex relative -left-3 space-x-8">
                  <InteractionButton label="Comments" type={ActionType.REPLY}>
                    Comments
                  </InteractionButton>
                  <InteractionButton label="Likes" type={ActionType.LIKE}>
                    Likes
                  </InteractionButton>
                  <InteractionButton label="Share" type={ActionType.SHARE}>
                    Share
                  </InteractionButton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: { posts: require("../data/posts.json") },
});
