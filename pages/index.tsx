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
import { PostInterface, ResponseInterface } from "../data/post.interface";
import useTranslation from "next-translate/useTranslation";

type PageProps = { posts: ResponseInterface<PostInterface> };

export default function PageHome({
  posts,
}: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  const { t } = useTranslation();
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

          <div className="py-8">
            <Card>
              <Heading tag={HeadingTags.HEADING3}>Voll leer hier! 😲</Heading>
              <Paragraph size={ParagraphSizes.m}>
                Verfasse deinen ersten Mumble oder folge anderen Usern!
              </Paragraph>
              <div className="mt-8 mb-4">
                <Textarea placeholder="Und was meinst du dazu?" />
              </div>
              <div className="flex space-x-5">
                <Button color={ButtonColors.SLATE} fullWidth>
                  Bild hochladen <SvgUpload />
                </Button>
                <Button color={ButtonColors.VIOLET} fullWidth>
                  Absenden <SvgSend />
                </Button>
              </div>
            </Card>
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
                  <Label size={LabelSizes.m}>
                    {post.creator.firstName} {post.creator.lastName}
                  </Label>
                </div>
                <div className="flex space-x-5 mb-6">
                  <IconLink
                    color={IconLinkColors.VIOLET}
                    label={post.creator.userName}
                  >
                    <SvgProfile />
                  </IconLink>
                  <IconLink color={IconLinkColors.SLATE} label="vor 17 Minuten">
                    <SvgTime />
                  </IconLink>
                </div>
                <div className="mb-6">
                  <Paragraph size={ParagraphSizes.m}>{post.text}</Paragraph>
                </div>
                <div className="flex space-x-1 mb-8">
                  <Link>#casfee</Link>
                  <Link>#goOST</Link>
                  <Link>#smartive</Link>
                </div>
                <div className="flex relative -left-3 space-x-8">
                  <InteractionButton label="Comments" type={ActionType.REPLY}>
                    {post.replyCount} Comments
                  </InteractionButton>
                  <InteractionButton label="Likes" type={ActionType.LIKE}>
                    {post.likeCount} Likes
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

      <div className="bg-slate-100 p-10">
        <div className="w-[680px]"></div>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => ({
  props: { posts: require("../data/posts.json") },
});
