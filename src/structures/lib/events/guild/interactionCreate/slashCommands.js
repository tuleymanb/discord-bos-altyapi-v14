import ids from "../../../../../../config/bot/example.ids.js";

export default async ({ client, interaction, lang }) => {
    const command = client.slashCommands.get(interaction.commandName.replace(/\s+/g, '_').toLowerCase());
    if (!command) return await interaction.deferReply({ephemeral: true}), await interaction.editReply({ content: 'an Erorr', ephemeral: true });
    try {
        await interaction.deferReply({});
        // console.log(command)
        // console.log(interaction)

        if (command.config.onlyDev && !ids.staff.devs.includes(interaction.user.id)) return await interaction.editReply({ content: `Sadece Geliştiricilere Özel.`, ephemeral: true });
        
        const args = [];
        let subCommand,subGroup;
        for (let option of interaction.options.data) {
            if (option.type === 2) {
                for (let options of option.options) {
                    if (options.type === 1) {
                        if (options.name) args.push(options.name);
                        subCommand = interaction.options.getSubcommand();
                        options.options?.forEach(x =>  {
                            if (x.value) args.push(x.value);
                        });
                    } else if (options.value) args.push(options.value);
                    subGroup = interaction.options.getSubcommandGroup()
                }
            } else {
                if (option.type === 1) {
                    if (option.name) args.push(option.name);
                    subCommand = interaction.options.getSubcommand();
                    option.options?.forEach(x =>  {
                        if (x.value) args.push(x.value);
                    });
                } else if (option.value) args.push(option.value);
            }
        }

        command.run({ client, interaction, lang, options: interaction.options, subCommand, subGroup })
    } catch (err) {
        console.log(err)
    }
}