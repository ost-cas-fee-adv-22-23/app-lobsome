import { GetServerSideProps, InferGetStaticPropsType } from "next";
import {
  Button,
  ButtonColors,
  Card,
  Heading,
  HeadingTags,
  Paragraph,
  ParagraphSizes,
  SvgSend,
  SvgUpload,
  Textarea,
} from "@smartive-education/design-system-component-library-lobsome";
import useTranslation from "next-translate/useTranslation";

type PageProps = {};

export default function PageHome({}: PageProps): InferGetStaticPropsType<
  typeof getServerSideProps
> {
  const { t } = useTranslation();

  return (
    <>
      <Heading tag={HeadingTags.HEADING3}>{t("index:title")}</Heading>

      <div className="bg-slate-100 p-10">
        <div className="w-[680px]">
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
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => ({
  props: { posts: require("../data/posts.json") },
});
