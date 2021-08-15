"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const util_1 = require("./util");
exports.Second = 1000;
exports.Minute = 60 * exports.Second;
exports.Hour = 60 * exports.Minute;
exports.Day = 24 * exports.Hour;
exports.OPTIONS = {
    giveaway: {
        maxGiveaways: Infinity,
        requiredPermission: 5,
        updateInterval: 5000,
        enableCommands: true,
        provider: '',
        commands: {},
        nextRefresh: (giveaway) => giveaway.lastRefresh + (5 * exports.Minute),
        winnersFilter: (member) => { var _a; return member.id !== ((_a = member.client.user) === null || _a === void 0 ? void 0 : _a.id); },
        runMessage,
        finishMessage
    }
};
function runMessage(giveaway, language) {
    return {
        content: language.get('GIVEAWAY_CREATE'),
        embed: new discord_js_1.MessageEmbed()
            .setTitle(giveaway.title)
            .setColor('#42f54e')
            .setDescription(language.get('GIVEAWAY_DESCRIPTION', giveaway.winnerCount, giveaway.endsAt, giveaway.author))
            .setFooter(language.get('ENDS_AT'))
            .setTimestamp(giveaway.endsAt)
    };
}
async function finishMessage(giveaway, winners, msg) {
    const embed = new discord_js_1.MessageEmbed()
        .setTitle(giveaway.title)
        .setFooter(msg.language.get('ENDED_AT'))
        .setTimestamp();
    if (winners.length < giveaway.winnerCount) {
        return msg.edit(msg.language.get('GIVEAWAY_END'), embed
            .setDescription(msg.language.get('NOT_ENOUGH_REACTIONS', giveaway.winnerCount)));
    }
    await msg.edit(msg.language.get('GIVEAWAY_END'), embed
        .setDescription(`**Winner: ${winners.map(us => us.toString()).join(', ')}**`));
    return msg.channel.send(msg.language.get('GIVEAWAY_WON', winners, giveaway.title, giveaway.message.url));
}
