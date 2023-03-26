import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  ActionType,
  Avatar,
  AvatarSize,
  Button,
  ButtonColors,
  ButtonSizes,
  Card,
  Heading,
  HeadingTags,
  IconLink,
  IconLinkColors,
  InteractionButton,
  Label,
  LabelColors,
  LabelSizes,
  Link,
  Paragraph,
  ParagraphSizes,
  SvgCalendar,
  SvgCancel,
  SvgLocation,
  SvgProfile,
  SvgTime,
} from '@smartive-education/design-system-component-library-lobsome';

type Props = {
  profile: {
    alias: string;
  };
};

export default function ProfilePage({ profile }: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  return (
    <>
      <h1>{profile.alias}</h1>

      <div className="bg-slate-100 p-10 flex items-center justify-center ">
        <div className="w-[680px]">
          <div className="space-y-8">
            <div className="relative ">
              <div className="absolute -bottom-24 right-8">
                <Avatar alt="" showBorder size={AvatarSize.XL} src="https://i.pravatar.cc/" />
              </div>
              <div>
                <img className="rounded-2xl	" src="https://placedog.net/680/320" alt="" />
              </div>
            </div>
            <div className="mt-6">
              <Heading tag={HeadingTags.HEADING3}>Damian Caduff</Heading>
              <div className="flex space-x-5 mt-2">
                <IconLink color={IconLinkColors.VIOLET} label="damiancaduff">
                  <SvgProfile />
                </IconLink>
                <IconLink color={IconLinkColors.SLATE} label="Chur">
                  <SvgLocation />
                </IconLink>
                <IconLink color={IconLinkColors.SLATE} label="Mitglied seit 35 Jahren">
                  <SvgCalendar />
                </IconLink>
              </div>
              <div className="mt-3">
                <Paragraph size={ParagraphSizes.m}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, earum expedita harum inventore placeat
                  quibusdam quos reprehenderit tenetur voluptas? Ab corporis, deleniti earum eius, eos error harum hic iure
                  magnam maiores mollitia nemo porro ut?
                </Paragraph>
              </div>
            </div>
            <div className="flex justify-end items-center space-x-5 mb-7">
              <Label size={LabelSizes.m} color={LabelColors.SLATE}>
                Du folgst Damian Caduff
              </Label>
              <Button color={ButtonColors.SLATE} label="Unfollow" size={ButtonSizes.M}>
                <SvgCancel />
              </Button>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <Card>
              {/* mumble */}
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
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { alias } }) => {
  return {
    props: {
      profile: { alias },
    },
  };
};
