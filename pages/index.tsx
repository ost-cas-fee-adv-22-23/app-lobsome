import {GetServerSideProps, InferGetStaticPropsType} from "next";
import {
    ActionType,
    Avatar,
    AvatarSize,
    Button,
    ButtonColors,
    Card,
    Heading,
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
    Textarea
} from "@smartive-education/design-system-component-library-lobsome";

type PageProps = {};

export default function PageHome({}: PageProps): InferGetStaticPropsType<
  typeof getServerSideProps
> {
  return (
    <>
        <div className="bg-slate-100 p-10">
            <Heading tag={HeadingTags.HEADING3}>Heading</Heading>

            <div className="w-[680px]">
                <Card>
                    <Heading tag={HeadingTags.HEADING3}>
                        Voll leer hier! 😲
                    </Heading>
                    <Paragraph size={ParagraphSizes.m}>
                        Verfasse deinen ersten Mumble oder folge anderen Usern!
                    </Paragraph>
                    <div className="mt-8 mb-4">
                        <Textarea placeholder="Und was meinst du dazu?" />
                    </div>
                    <div className="flex space-x-5">
                        <Button
                            color={ButtonColors.SLATE}
                            fullWidth
                        >
                            Bild hochladen{' '}
                            <SvgUpload />
                        </Button>
                        <Button
                            color={ButtonColors.VIOLET}
                            fullWidth
                        >
                            Absenden{' '}
                            <SvgSend />
                        </Button>
                    </div>
                </Card>
            </div>
            <div className="bg-slate-100 p-10">
                <div className="w-[680px]">
                    <Card>
                        <div className="absolute -left-8 top-4">
                            <Avatar
                                alt="Portrait of Matilda"
                                showBorder
                                size={AvatarSize.M}
                                src="https://i.pravatar.cc/"
                            />
                        </div>
                        <div className="mb-1">
                            <Label size={LabelSizes.m}>
                                Damian Caduff
                            </Label>
                        </div>
                        <div className="flex space-x-5 mb-6">
                            <IconLink
                                color={IconLinkColors.VIOLET}
                                label="damiancaduff"
                            >
                                <SvgProfile />
                            </IconLink>
                            <IconLink
                                color={IconLinkColors.SLATE}
                                label="vor 17 Minuten"
                            >
                                <SvgTime />
                            </IconLink>
                        </div>
                        <div className="mb-6">
                            <Paragraph size={ParagraphSizes.m}>
                                Laoreet tincidunt vulputate in commodo. Sed vestibulum interdum sed neque.
                            </Paragraph>
                        </div>
                        <div className="flex space-x-1 mb-8">
                            <Link>
                                #casfee
                            </Link>
                            <Link>
                                #goOST
                            </Link>
                            <Link>
                                #smartive
                            </Link>
                        </div>
                        <div className="flex relative -left-3 space-x-8">
                            <InteractionButton
                                label="Comments"
                                type={ActionType.REPLY}
                            >
                                Comments
                            </InteractionButton>
                            <InteractionButton
                                label="Likes"
                                type={ActionType.LIKE}
                            >
                                Likes
                            </InteractionButton>
                            <InteractionButton
                                label="Share"
                                type={ActionType.SHARE}
                            >
                                Share
                            </InteractionButton>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => ({
  props: { posts: require("../data/posts.json") },
});
