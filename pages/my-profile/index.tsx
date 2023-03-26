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
  LabelSizes,
  Link,
  Paragraph,
  ParagraphSizes,
  SvgCalendar,
  SvgEdit,
  SvgLocation,
  SvgProfile,
  SvgSettings,
  SvgTime,
  Tabs,
} from '@smartive-education/design-system-component-library-lobsome';

export default function MyProfilePage() {
  return (
    <>
      <div className="bg-slate-100 p-10 flex items-center justify-center ">
        <div className="w-[680px]">
          <div className="space-y-8">
            <div className="relative ">
              <div className="absolute -bottom-24 right-8">
                <Avatar alt="" showBorder size={AvatarSize.XL} src="https://i.pravatar.cc/" />
                <div className="absolute -mt-14 right-4">
                  <Button color={ButtonColors.SLATE} label="Button Test" showOnlyIcon size={ButtonSizes.M}>
                    <SvgEdit />
                  </Button>
                </div>
              </div>
              <div>
                <img className="rounded-2xl	" src="https://placedog.net/680/320" alt="" />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <Heading tag={HeadingTags.HEADING3}>Damian Caduff</Heading>
                <SvgSettings />
              </div>
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
            <div className="flex  items-center space-x-5 mb-7">
              <Tabs
                activeId={1}
                items={[
                  {
                    id: 1,
                    label: 'Meine Mumbles',
                  },
                  {
                    id: 2,
                    label: 'Deine Likes',
                  },
                ]}
                onChange={function noRefCheck() {
                  console.log('clicked');
                }}
              />
            </div>
          </div>

          <div className="mt-4 space-y-4">
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
