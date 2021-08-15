"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Command {
    constructor(store, file, directory) {
        super(store, file, directory, klasa_1.util.mergeDefault({
            requiredPermissions: ['EMBED_LINKS', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
            permissionLevel: 5,
            runIn: ['text'],
            usageDelim: ' ',
            usage: '<duration:duration> [winner_count:winner_count] <title:...str{0,250}>',
            enabled: store.client.options.giveaway.enableCommands,
            description: (lang) => lang.get('COMMAND_START_DESCRIPTION'),
            extendedHelp: (lang) => lang.get('COMMAND_START_EXTENDED')
        }, store.client.options.giveaway.commands.start));
        this.customizeResponse('duration',
            `💥 Please include a length of time, and optionally a number of winners and a prize!
Example usage: \`.gstart 30m 5w Awesome T-Shirt\``)
        this.customizeResponse('title',
            `💥 Please include a title for the giveaway!
Example usage: \`.gstart 5m Awesome T-Shirt\``)
        this.createCustomResolver('winner_count', (arg) => {
            const winnerCount = Number(arg.slice(0, -1))
            if (!winnerCount) throw '';
            if (!arg.endsWith('w')) throw '';
            return winnerCount
        })
    }
    async run(msg, [time, winnerCount, title]) {
        if (!winnerCount) winnerCount = 1;
        await this.client.giveawayManager.create(msg.channel, {
            endsAt: time.getTime(),
            author: msg.author.id,
            title,
            winnerCount
        });
        return null;
    }
}
exports.default = default_1;
