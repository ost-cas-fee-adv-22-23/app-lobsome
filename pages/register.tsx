import {
  Button,
  ButtonColors,
  ButtonSizes,
  Heading,
  HeadingColors,
  Input,
  Label,
  LabelSizes,
  Link,
  SvgEye,
  SvgMumble,
} from "@smartive-education/design-system-component-library-lobsome";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import React from "react";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <div className="absolute right-0 flex space-x-1 p-5 bottom-0  ">
        <Button
          color={ButtonColors.VIOLET}
          size={ButtonSizes.M}
          onClick={async () => await setLanguage("en")}
        >
          EN
        </Button>

        <Button
          color={ButtonColors.VIOLET}
          size={ButtonSizes.M}
          onClick={async () => await setLanguage("de")}
        >
          DE
        </Button>
      </div>
      <div className="flex items-stretch bg-grey-lighter min-h-screen">
        <div className="bg-gradient-to-br from-pink-500 to-violet-600 flex-1 text-grey-darker text-center bg-grey-light ">
          <div className="flex items-center justify-center h-screen">
            <Heading color={HeadingColors.WHITE}>
              Find out what’s new in <span>#fashion</span>
            </Heading>
          </div>
        </div>
        <div className="flex-1 text-grey-darker text-center bg-grey-light ">
          <div className="flex items-center justify-center h-screen">
            <div className="space-y-2">
              <div className="mb-8">
                <Heading color={HeadingColors.SLATE}>
                  {t("register:title")}
                </Heading>
              </div>
              <Input label={t("register:label-name")}></Input>
              <Input label={t("register:label-username")}></Input>
              <Input label={t("register:label-mail")}></Input>
              <Input label={t("register:label-password")}>
                <SvgEye />
              </Input>

              <Button
                color={ButtonColors.GRADIENT}
                label={t("register:label-submit")}
                size={ButtonSizes.M}
                fullWidth={true}
              >
                <SvgMumble />
              </Button>
              <Label size={LabelSizes.s}>
                {t("register:label-already-registered")}
              </Label>
              <Link href={"/login"} hasUnderline={true}>
                {t("register:link-go-to-login")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
