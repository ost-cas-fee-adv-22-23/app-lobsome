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
    SvgMumble
} from "@smartive-education/design-system-component-library-lobsome";

export default function Home() {

    return (
        <>
            <div className="flex items-stretch bg-grey-lighter min-h-screen">
                <div
                    className="bg-gradient-to-br from-pink-500 to-violet-600 flex-1 text-grey-darker text-center bg-grey-light ">
                    <div className="flex items-center justify-center h-screen">
                        <Heading color={HeadingColors.WHITE}>Find out what’s new in <span>#fashion</span></Heading>
                    </div>
                </div>
                <div className="flex-1 text-grey-darker text-center bg-grey-light ">

                    <div className="flex items-center justify-center h-screen">
                        <div className="space-y-2">

                            <div className="mb-8">
                                <Heading color={HeadingColors.SLATE}>Registrieren</Heading>
                            </div>
                            <Input
                                label="Vorname Name"
                            >
                            </Input>
                            <Input
                                label="User Name"
                            >
                            </Input>
                            <Input
                                label="E-Mail"
                            >
                            </Input>
                            <Input
                                label="Password"
                            >
                                <SvgEye/>
                            </Input>

                            <Button
                                color={ButtonColors.GRADIENT}
                                label="Let's mumble"
                                size={ButtonSizes.M}
                                fullWidth={true}
                            >
                                <SvgMumble/>
                            </Button>
                            <Label size={LabelSizes.s}>Bereits registriert?</Label>
                            <Link hasUnderline={true}> Jetzt anmelden</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
