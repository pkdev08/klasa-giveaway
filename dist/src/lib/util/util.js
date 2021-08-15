"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Util {
    static ms(duration) {
        const seconds = Math.floor((duration / constants_1.Second) % 60);
        const minutes = Math.floor((duration / constants_1.Minute) % 60);
        const hours = Math.floor((duration / constants_1.Hour) % 24);
        const days = Math.floor(duration / constants_1.Day);
        let mess = '';
        if (days)
            mess += `**${days}** day${days > 1 ? 's' : ''} `;
        if (hours)
            mess += `**${hours}** hour${hours > 1 ? 's' : ''} `;
        if (minutes)
            mess += `**${minutes}** minute${minutes > 1 ? 's' : ''} `;
        if (seconds)
            mess += `**${seconds}** second${seconds > 1 ? 's' : ''} `;
        return mess;
    }
    /*static getWinners(msg, users, winnerCount) {
        return users
            .mapValues(us => msg.guild.member(us))
            .filter(us => Boolean(us))
            .filter(us => msg.client.options.giveaway.winnersFilter(us))
            .random(winnerCount)
            .filter(us => Boolean(us));
    }*/
    static async getWinners(msg, users, winnerCount) {
        //const blacklistedUsers = msg.guild.settings.get('giveaways.blacklistedUsers');
        //const whiteListRoles = msg.guild.settings.get('giveaways.whiteListRoles');
        // .filter(u => !blacklistedUsers.includes(u.id)
       // .filter(u => !whiteListRoles.length || msg.guild.member(u).roles.cache.some(role => whiteListRoles.includes(role.id)))
        const members = await Promise.all(
            users
            .map(u => msg.guild.members.fetch(u))
        );

        return members
            .filter(u => Boolean(u))
            .filter(us => msg.client.options.giveaway.winnersFilter(us))
            .sort(() => 0.5 - Math.random()).slice(0, winnerCount)
            .filter(us => Boolean(us))
    }
}
exports.default = Util;
