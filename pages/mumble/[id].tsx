import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  ActionType,
  Avatar,
  AvatarSize,
  Button,
  ButtonColors,
  Card,
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
} from '@smartive-education/design-system-component-library-lobsome';

type Props = {
  mumble: {
    id: string;
  };
};

export default function MumblePage({ mumble }: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  return (
    <>
      <h1>{mumble.id}</h1>

      <div className="bg-slate-100 p-10 flex items-center justify-center ">
        <div className="w-[680px]">
          <Card>
            {/* mumble */}
            <div className="space-y-16">
              <div>
                <div className="absolute -left-8 top-4">
                  <Avatar alt="Portrait of Matilda" showBorder size={AvatarSize.M} src="https://i.pravatar.cc/" />
                </div>
                <div className="mb-1">
                  <Label size={LabelSizes.xl}>Damian Caduff</Label>
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
                    Ttincidunt vulputate in commodo. Sed vestibulum interdum sed neque.
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
              </div>

              {/* mumble your response */}
              <div>
                <div className="flex space-x-2">
                  <Avatar alt="Portrait of Matilda" size={AvatarSize.S} src="https://i.pravatar.cc/" />
                  <div>
                    <div className="mb-1">
                      <Label size={LabelSizes.m}>Damian Caduff</Label>
                    </div>
                    <div className=" space-x-5 mb-6">
                      <IconLink color={IconLinkColors.VIOLET} label="damiancaduff">
                        <SvgProfile />
                      </IconLink>
                    </div>
                  </div>
                </div>

                <div className="mb-2">
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
              </div>

              {/* mumble other responses */}
              <div>
                <div className="flex space-x-2">
                  <Avatar alt="Portrait of Matilda" size={AvatarSize.S} src="https://i.pravatar.cc/" />
                  <div>
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
                  </div>
                </div>
                <div className="mb-6">
                  <Paragraph size={ParagraphSizes.m}>
                    Ttincidunt vulputate in commodo. Sed vestibulum interdum sed neque.
                  </Paragraph>
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
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { id } }) => {
  return {
    props: {
      mumble: { id },
    },
  };
};
