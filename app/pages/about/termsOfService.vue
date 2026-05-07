<style scoped>
p, ul, ol, h5 {
    margin-bottom: 26px;
}

h3, h6 {
    margin-bottom: 18px;
}

#lastUpdated {
    margin-bottom: 54px;
    display:inline-block;
}

ul > li {
    margin-bottom: 18px;
}
</style>

<template>
    <div>
        <h3>TERMS OF SERVICE</h3>
        <p>
            <strong id="lastUpdated">Last updated September 03, 2023</strong>
        </p>
        <h5>Usage Agreement</h5>
        <p>By inviting the bot and using its features you agreeing to the below mentioned Terms and Privacy Policy (Policy) of the bot.</p>

        <p>
            You acknowledge that you have the privilege to use the bot freely on any Discord Server (Server) you share with it,
            that you can invite it to any Server that you have "Manage Server", "Administrator" rights in, this privilege may be revoked at anytime,
            if you're subject of breaking the terms and/or policy of this bot, or the <a href="https://discord.com/terms">Terms of Service</a>,
            <a href="https://discord.com/privacy">Privacy Policy</a> and/or <a href="https://discord.com/guidelines">Community Guidelines</a>
            of <a href="https://discord.com">Discord Inc</a>.
        </p>
        <p>
            Through Inviting the bot may it collect specific data as described in its <a href="/about/privacy">Privacy Policy</a>.<br>
            The intended usage of this data is for core functionalities of the bot such as command handling, guild-specific settings and other systems that makes the website/bot work.
        </p>
        <h5>Intended Age</h5>
        <p>
            The bot may not be used by individuals under the minimal age described in Discord's Terms of Service.<br>
            Features, such as commands which are marked as "NSFW" (Not safe for work) may not be used by individuals under the age of maturity in their country. Doing so will be seen as a violation of these terms and will result in a removal of the bot from any servers you own.
        </p>
        <h5>Affiliation</h5>
        <p>
            The Bot is not affiliated with, supported or made by Discord Inc.<br>
            Any direct connection to Discord or any of its Trademark objects is purely coincidental. We do not claim to have the copyright ownership of any of Discord's assets, trademarks or other intellectual property.
        </p>
        <h5>Liability</h5>
        <p>
            The owner of the bot may not be made liable for individuals breaking these Terms at any given time.<br>
            He has faith in the end users being truthful about their information and not misusing this bot or The Services of Discord Inc in a malicious way.
        </p>
        <p>
            We reserve the right to update these terms at our own discretion, giving you a 1-Week (7 days) period to opt out of these terms if you're not agreeing with the new changes.<br>
            You may opt out by Removing the bot from any Server you have the rights for.
        </p>
        <h5>Contact</h5>
        <p>
            People may get in contact through e-mail at <nuxt-img class="inline" src="/images/email.png" alt="email"/><br />
            Other ways of support may be provided but aren't guaranteed.
        </p>
    </div>

</template>

<script>
export default {
    name: "termsOfService",
	auth: false,
}
</script>

<style scoped>

</style>