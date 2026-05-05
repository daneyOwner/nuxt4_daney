<style scoped lang="scss">
.commandList {
    display: flex;

    &__search_bar {
        width: 100%;
        margin-bottom: 16px;
        border-radius: 0.25rem;
        padding-left: 6px;
        color: rgb(168, 168, 168);
        background-color: rgb(42, 42, 42);
        border: 1px solid rgb(27, 27, 27);

        &:focus-visible {
            outline: -webkit-focus-ring-color auto 0;
        }
    }

    &__context_menu {
        width: 300px;
    }

    &__commands {
        width: calc(100vw - 316px);
        margin-left: 16px;
    }
}

.list-group-item {
    color: rgb(168, 168, 168);
    background-color: rgb(42, 42, 42);
    border-color: rgb(27, 27, 27);
    font-weight: normal;

    &.active {
        background-color: #3c3c3c;
        color: #fff;
    }
}

@media (max-width: 650px) {
    .commandList {
        flex-direction: column;

        &__context_menu {
            width: 100%;
        }

        &__commands {
            width: 100%;
            margin-top: 16px;
            margin-left: 0;
        }
    }
}
</style>

<template>
    <div>
        <div class="commandList">
            <div class="commandList__context_menu">
                <input class="commandList__search_bar" v-model.trim="search" placeholder="Search..."/>
                <div class="list-group">
                    <a @click="changeCommandType('all')" :class="{'active': commandType === 'all'}"
                       class="pointer transition list-group-item list-group-item-action">All</a>
                    <a @click="changeCommandType('leveling')" :class="{'active': commandType === 'leveling'}"
                       class="pointer transition list-group-item list-group-item-action">Leveling System</a>
                    <a @click="changeCommandType('moderation')" :class="{'active': commandType === 'moderation'}"
                       class="pointer transition list-group-item list-group-item-action">Moderation</a>
                    <a @click="changeCommandType('unit-conversion')"
                       :class="{'active': commandType === 'unit-conversion'}"
                       class="pointer transition list-group-item list-group-item-action">Unit Conversions</a>
                    <a @click="changeCommandType('utility')"
                       :class="{'active': commandType === 'utility' || commandType === 'app-commands'}"
                       class="pointer transition list-group-item list-group-item-action">Utility Commands</a>
                    <a @click="changeCommandType('app-commands')" :class="{'active': commandType === 'app-commands'}"
                       class="pointer transition list-group-item list-group-item-action ps-4">- App Commands</a>
                    <a @click="changeCommandType('sfw')"
                       :class="{'active': commandType === 'sfw' || commandType === 'female-male'}"
                       class="pointer transition list-group-item list-group-item-action">SFW Reactions</a>
                    <a @click="changeCommandType('female-male')" :class="{'active': commandType === 'female-male'}"
                       class="pointer transition list-group-item list-group-item-action ps-4">- Female x Male</a>
                    <a @click="changeCommandType('nsfw')"
                       :class="{'active': commandType === 'nsfw' || commandType === 'nsfw-female-male' || commandType === 'nsfw-female-solo'}"
                       class="pointer transition list-group-item list-group-item-action">NSFW Reactions</a>
                    <a @click="changeCommandType('nsfw-female-male')"
                       :class="{'active': commandType === 'nsfw-female-male'}"
                       class="pointer transition list-group-item list-group-item-action ps-4">- Female x Male</a>
                    <a @click="changeCommandType('nsfw-female-solo')"
                       :class="{'active': commandType === 'nsfw-female-solo'}"
                       class="pointer transition list-group-item list-group-item-action ps-4">- Female Solo</a>
                </div>
            </div>
            <div class="commandList__commands">
                <div class="alert alert-dark alert-alert" role="alert">
                    For now there is only commands for reactions, more documentation will be added in the future.
                </div>
                <accordion id="commands">
                    <template v-for="command in commands">
                        <template v-if="search === null">
                            <command-item :command="command" v-if="commandType === 'all'"/>
                            <command-item :command="command"
                                          v-else-if="command.commandTypes.includes(commandType)"/>
                        </template>
                        <command-item v-else-if="command.commandName.toLowerCase().includes(search)"
                                      :command="command"/>
                    </template>
                </accordion>
            </div>
        </div>
    </div>
</template>

<script>
import CommandItem from "~/components/main/commands/command-item.vue";

export default {
    name: "commands",
    components: {CommandItem},
    auth: false,
    data() {
        return {
            commandType: "all",
            commands: [],
            search: null,
        }
    },
    methods: {
        changeCommandType(cmd) {
            this.commandType = cmd;
            this.search = null;
        }
    },
    mounted() {
//#region Leveling System
        this.commands.push({
            header: true,
            commandName: "Leveling System",
            commandTypes: ["leveling"],
        });

        this.commands.push({
            commandName: "level",
            commandShortText: "Show level information.",
            commandBigText: `
                                <span>You can choose a person or leave it blank and see your own level information.</span>
                                <span>user<small> - which person?</small></span><br>
                            `,
            commandTypes: ["leveling"],
        });
        this.commands.push({
            commandName: "leaderboard",
            commandShortText: "Show leaderboard.",
            commandBigText: `
                                <span>type<small> - which type?</small></span>
                                <ul class="list-disc pl-8">
                                    <li>Monthly</li>
                                    <li>Yearly</li>
                                    <li>All Time</li>
                                </ul>
                            `,
            commandTypes: ["leveling"],
        });
        this.commands.push({
            commandName: "disable_level_up_message",
            commandShortText: "Disable level up message ping",
            commandBigText: `
                                <span>You can disable the level up ping by using this command(Might be come a paid command in the future).</span>
                            `,
            commandTypes: ["leveling"],
        });
//#endregion

//#region Marriage System
        this.commands.push({
            header: true,
            commandName: "Marriage System",
            commandTypes: ["marriage"],
        });
        this.commands.push({
            commandName: "marry",
            commandShortText: "Marry someone.",
            commandBigText: `
                                <span>reason<small> - what is the reason for the ban?</small></span>
                            `,
            commandTypes: ["marriage"],
        });
        this.commands.push({
            commandName: "marriages",
            commandShortText: "Show all marriages.",
            commandBigText: `
                                <span>This command will show all the marriages in this server.</span>
                            `,
            commandTypes: ["marriage"],
        });
        this.commands.push({
            commandName: "marriage_info",
            commandShortText: "Shows someones marriage status.",
            commandBigText: `
                                <span>user<small> - Left empty it will be yourself. Which person do you want to check?</small></span><br>
                            `,
            commandTypes: ["marriage"],
        });
        this.commands.push({
            commandName: "divorce",
            commandShortText: "Divorce the person you are married to.",
            commandBigText: `
                                <span>user<small> - Who do you want to divorse?</small></span><br>
                            `,
            commandTypes: ["marriage"],
        });
//#endregion

//#region Moderation Commands
        this.commands.push({
            header: true,
            commandName: "Moderation Commands",
            commandTypes: ["moderation"],
        });
        this.commands.push({
            commandName: "ban",
            commandShortText: "Ban a user.",
            commandBigText: `
                                <span>user<small> - which person should be banned?</small></span><br>
                                <span>reason<small> - what is the reason for the ban?</small></span>
                            `,
            commandTypes: ["moderation"],
        });
        this.commands.push({
            commandName: "unban",
            commandShortText: "Unban a user.",
            commandBigText: `
                                <span>user<small> - which person should be unbanned?</small></span>
                            `,
            commandTypes: ["moderation"],
        });
        this.commands.push({
            commandName: "correct",
            commandShortText: "Correct a user.",
            commandBigText: `
                                <span>user<small> - which person should be corrected?</small></span><br>
                                <span>reason<small> - what is the reason for the correction?</small></span>
                            `,
            commandTypes: ["moderation"],
        });
        this.commands.push({
            commandName: "warn",
            commandShortText: "Warn a user.",
            commandBigText: `
                                <span>user<small> - which person should be warned?</small></span><br>
                                <span>reason<small> - what is the reason for the warning?</small></span>
                            `,
            commandTypes: ["moderation"],
        });
        this.commands.push({
            commandName: "check_moderation_actions",
            commandShortText: "Check previous moderation actions on a user.",
            commandBigText: `
                                <span>user<small> - which person do you want to check the history of?</small></span>
                            `,
            commandTypes: ["moderation"],
        });
//#endregion

//#region Unit Conversions
        this.commands.push({
            header: true,
            commandName: "Unit Conversions",
            commandTypes: ["unit-conversion"],
        });
        this.commands.push({
            commandName: "convert_length",
            commandShortText: "Convert a length type to another.",
            commandBigText: `
                                <span>There is these messurements you can choose from:</span>
                                <ul class="list-disc pl-8">
                                    <li>Centimeter</li>
                                    <li>Chain</li>
                                    <li>Decameter</li>
                                    <li>Decimeter</li>
                                    <li>Foot</li>
                                    <li>Hand</li>
                                    <li>Hectometer</li>
                                    <li>Inch</li>
                                    <li>Kilolight Year</li>
                                    <li>Kilometer</li>
                                    <li>Kiloparsec</li>
                                    <li>Light Year</li>
                                    <li>Megaparsec</li>
                                    <li>Meter</li>
                                    <li>Microinch</li>
                                    <li>Micrometer</li>
                                    <li>Mil</li>
                                    <li>Mile</li>
                                    <li>Millimeter</li>
                                    <li>Nanometer</li>
                                    <li>Nautical Mile</li>
                                    <li>Parsec</li>
                                    <li>Twip</li>
                                    <li>Us Survey Foot</li>
                                    <li>Yard</li>
                                </ul>
                            `,
            commandTypes: ["unit-conversion"],
        });
        this.commands.push({
            commandName: "convert_weight",
            commandShortText: "Convert a weight type to another.",
            commandBigText: `
                                <span>There is these messurements you can choose from:</span>
                                <ul class="list-disc pl-8">
                                    <li>Centigram</li>
                                    <li>Decagram</li>
                                    <li>Decigram</li>
                                    <li>Earth Mass</li>
                                    <li>Grain</li>
                                    <li>Gram</li>
                                    <li>Hectogram</li>
                                    <li>Kilogram</li>
                                    <li>Kilopound</li>
                                    <li>Kilotonne</li>
                                    <li>Long Hundredweight</li>
                                    <li>Long Ton</li>
                                    <li>Megapound</li>
                                    <li>Megatonne</li>
                                    <li>Microgram</li>
                                    <li>Milligram</li>
                                    <li>Nanogram</li>
                                    <li>Ounce</li>
                                    <li>Pound</li>
                                    <li>Short Hundredweight</li>
                                    <li>Short Ton</li>
                                    <li>Slug</li>
                                    <li>Solar Mass</li>
                                    <li>Stone</li>
                                    <li>Tonne</li>
                                </ul>
                            `,
            commandTypes: ["unit-conversion"],
        });
        this.commands.push({
            commandName: "convert_height",
            commandShortText: "Convert height, cm or feet.",
            commandBigText: `
                                <span>You can convert cm to feet with the correct format on them.</span>
                            `,
            commandTypes: ["unit-conversion"],
        });
//#endregion

//#region Utility Commands
        this.commands.push({
            header: true,
            commandName: "Utility Commands",
            commandTypes: ["utility"],
        });
        this.commands.push({
            commandName: "time",
            commandShortText: "Displays your local time.",
            commandBigText: `
                                <span>time<small> - Format: 11:30pm, 11pm, 23:30, 23?</small></span>
                            `,
            commandTypes: ["utility"],
        });
        this.commands.push({
            commandName: "Get User Info",
            commandShortText: "Get User Information.",
            appCommand: true,
            commandBigText: `
                                <span>This is an App Command you have to right click on a users name or the message of a user then go to the app menu and select the command it.</span>
                                <br>
                                <br>
                                <span>This will give you information such as:</span>
                                <ul class="list-disc pl-8">
                                    <li>User ID</li>
                                    <li>Display Name</li>
                                    <li>Nickname</li>
                                    <li>Username</li>
                                    <li>Joined At</li>
                                    <li>Account Age</li>
                                </ul>
                            `,
            commandTypes: ["utility", "app-commands"],
        });
//#endregion

//#region SFW Commands
        this.commands.push({
            header: true,
            commandName: "Reaction Commands",
            commandTypes: ["sfw", "female-male"],
        });
        this.commands.push({
            commandName: "cuddle",
            commandShortText: "Cuddle or be cuddled.",
            commandBigText: `
                                <span>content_type<small> - which content type?</small></span>
                                <ul class="list-disc pl-8">
                                    <li>IRL</li>
                                    <li>Anime</li>
                                </ul>
                                <span>cuddle_or_get_cuddled<small> - who should receive it?</small></span>
                            `,
            commandTypes: ["sfw", "female-male"],
        });
        this.commands.push({
            commandName: "cheek_kiss",
            commandShortText: "Cheek kiss or get your cheek kissed.",
            commandBigText: `
                                <span>content_type<small> - which content type?</small></span>
                                <ul class="list-disc pl-8">
                                    <li>IRL</li>
                                    <li>Anime</li>
                                </ul>
                                <span>kiss_or_get_your_cheek_kissed<small> - who should receive it?</small></span>
                            `,
            commandTypes: ["sfw", "female-male"],
        });
        this.commands.push({
            commandName: "kiss",
            commandShortText: "Kiss or be kissed.",
            commandBigText: `
                                <span>content_type<small> - which content type?</small></span>
                                <ul class="list-disc pl-8">
                                    <li>IRL</li>
                                    <li>Anime</li>
                                </ul>
                                <span>kiss_or_get_kissed<small> - who should receive it?</small></span>
                            `,
            commandTypes: ["sfw", "female-male"],
        });
        this.commands.push({
            commandName: "forehead_kiss",
            commandShortText: "Forehead kiss or get your forehead kissed.",
            commandBigText: `
                                <span>content_type<small> - which content type?</small></span>
                                <ul class="list-disc pl-8">
                                    <li>IRL</li>
                                    <li>Anime</li>
                                </ul>
                                <span>kiss_or_get_your_forehead_kissed<small> - who should receive it?</small></span>
                            `,
            commandTypes: ["sfw", "female-male"],
        });
        this.commands.push({
            commandName: "hug",
            commandShortText: "Hug or be hugged.",
            commandBigText: `
                                <span>content_type<small> - which content type?</small></span>
                                <ul class="list-disc pl-8">
                                    <li>IRL</li>
                                    <li>Anime</li>
                                </ul>
                                <span>hug_or_get_hugged<small> - who should receive it?</small></span>
                            `,
            commandTypes: ["sfw", "female-male"],
        });
        this.commands.push({
            commandName: "pat",
            commandShortText: "Pet or be petted.",
            commandBigText: `
                                <span>content_type<small> - which content type?</small></span>
                                <ul class="list-disc pl-8">
                                    <li>IRL</li>
                                    <li>Anime</li>
                                </ul>
                                <span>pat_or_get_petted<small> - who should receive it?</small></span>
                            `,
            commandTypes: ["sfw", "female-male"],
        });
        this.commands.push({
            commandName: "punch",
            commandShortText: "Punch or get punched.",
            commandBigText: `
                                <span>content_type<small> - which content type?</small></span>
                                <ul class="list-disc pl-8">
                                    <li>IRL</li>
                                    <li>Anime</li>
                                </ul>
                                <span>punch_or_get_punched<small> - who should receive it?</small></span>
                            `,
            commandTypes: ["sfw", "female-male"],
        });
        this.commands.push({
            commandName: "slap",
            commandShortText: "Slap or get slapped.",
            commandBigText: `
                                <span>content_type<small> - which content type?</small></span>
                                <ul class="list-disc pl-8">
                                    <li>IRL</li>
                                    <li>Anime</li>
                                </ul>
                                <span>slap_or_get_slapped<small> - who should receive it?</small></span>
                            `,
            commandTypes: ["sfw", "female-male"],
        });
//#endregion

        /*//#region NSFW Commands
                this.commands.push({
                    header: true,
                    commandName: "NSFW Commands",
                    commandTypes: ["nsfw", "nsfw-female-male", "nsfw-female-solo"],
                });
                this.commands.push({
                    commandName: "anal",
                    commandShortText: "Fuck or get fucked in the ass.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>fuck_or_get_your_ass_fucked<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "blowjob",
                    commandShortText: "Give or get a blowjob.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>giver_or_receiver<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "creamepie",
                    commandShortText: "Give or get creampie by someone.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>giver_or_receiver<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "doggy-style",
                    commandShortText: "Fuck or get fucked.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>fuck_or_get_fucked<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "dick-ride",
                    commandShortText: "Do a dick ride.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>ride_or_fuck<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "dick-rubbing",
                    commandShortText: "Rub dick or get your dick rubbed.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>rub_or_get_your_dick_rubbed<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "facial",
                    commandShortText: "Give or get a facial.",
                    commandBigText: `
                                        <span>content_type<small> - which content type do you want to do it with?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>giver_or_receiver<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "fingering",
                    commandShortText: "Finger or get fingered.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>finger_or_get_fingered<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "fuck",
                    commandShortText: "Fuck or get fucked.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>fuck_or_get_fucked<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "pussy-licking",
                    commandShortText: "Lick or get licked.",
                    commandBigText: `<span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>lick_or_get_licked<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "handjob",
                    commandShortText: "Give or get a handjob.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>giver_or_receiver<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "spank",
                    commandShortText: "Spank or get spanked.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>spank_or_get_spanked<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "tit-fuck",
                    commandShortText: "Fuck or get your tits fucked.",
                    commandBigText: `
                                        <span>content_type<small> - which content type?</small></span>
                                        <ul class="list-disc pl-8">
                                            <li>IRL</li>
                                            <li>Hentai</li>
                                        </ul>
                                        <span>fuck_or_get_fucked<small> - who should receive it?</small></span>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-male"],
                });
                this.commands.push({
                    commandName: "female_solo",
                    commandShortText: "Female solo has 6 categories.",
                    commandBigText: `
                                        <ul class="list-disc pl-8">
                                            <li>Fingering</li>
                                            <li>Spanking</li>
                                            <li>Bounce</li>
                                            <li>Twerking</li>
                                            <li>Sucking</li>
                                            <li>Other</li>
                                        </ul>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-solo"],
                });
                this.commands.push({
                    commandName: "female_solo_dildo",
                    commandShortText: "Female Solo Dildo has 3 categories.",
                    commandBigText: `
                                        <ul class="list-disc pl-8">
                                            <li>Anal</li>
                                            <li>Blowjob</li>
                                            <li>Vaginal</li>
                                        </ul>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-solo"],
                });
                this.commands.push({
                    commandName: "female_solo_showing_off",
                    commandShortText: "Female Solo Showing Off has 4 categories.",
                    commandBigText: `
                                        <ul class="list-disc pl-8">
                                            <li>Ass</li>
                                            <li>Body</li>
                                            <li>Tits</li>
                                            <li>Pussy</li>
                                        </ul>
                                    `,
                    commandTypes: ["nsfw", "nsfw-female-solo"],
                });
        //#endregion*/

        this.$nextTick(() => {
            const accordionButtons = document.querySelectorAll(".accordion-button");

            accordionButtons.forEach((button) => {
                button.addEventListener("click", function () {
                    accordionButtons.forEach((button) => {
                        if (button !== this) {
                            button.classList.add("collapsed");
                            button.parentElement.nextElementSibling.classList.remove("show")
                            button.parentElement.nextElementSibling.style.maxHeight = '0';
                        }
                    });

                    const expanded = !this.classList.contains("collapsed");


                    const content = this.parentElement.nextElementSibling;

                    if (expanded) {
                        this.classList.add("collapsed");
                        this.parentElement.nextElementSibling.classList.remove("show")
                        content.style.maxHeight = '0';
                    } else {
                        this.classList.remove("collapsed");
                        this.parentElement.nextElementSibling.classList.add("show")
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            });
        })
    },
}
</script>