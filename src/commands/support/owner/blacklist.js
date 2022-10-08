import users from "../../../structures/lib/api/users.js";
import { getBlacklist, setBlacklist } from "../../../structures/lib/manager/database.js";

export const config = {
    name: "blacklist",
    description: "Kullanıcıyı karalisteye göndermek için ideal.",
    options: [
        { name: "user", description: "Karaliste ekle", type: 2, options: [ 
            { name: "add", description: "Kullanıcıyı karalisteye al", type: 1, options: [ 
                { name: "id", description: "Karaliste alınacak kullanıcının ID'si", min_length: 18, max_length: 19, type: 3, required: true, }, 
                { name: "reason", description: "Karaliste nedeni nedir?", min_length: 18, type: 3, required: true, }, 
            ] }, 
            { name: "remove", description: "Sunucuyu karalisteye al", type: 1, options: [ 
                { name: "id", description: "Karalisteden çıkarılacak sunucu ID'si", min_length: 18, max_length: 19, type: 3, required: true, }, 
            ] },
        ] },
        { name: "server", description: "Karaliste kaldır", type: 2, options: [ 
            { name: "add", description: "kullanıcıyı karalisteden kaldır", type: 1, options: [
                { name: "id", description: "karalisteden çıkarılacak kulanıcı ID'si", min_length: 18, max_length: 19, type: 3, required: true, },
                { name: "reason", description: "Karaliste nedeni nedir?", min_length: 18, type: 3, required: true, }, 
            ] }, 
            { name: "remove", description: "sunucuyu karalisteden kaldır", type: 1, options: [
                { name: "id", description: "karalisteden çıkarılacak sunucu ID'si", min_length: 18, max_length: 19, type: 3, required: true, },
            ] },
        ] },
    ],
    onlyDev: true,
}
export async function run({ client, interaction, options, subCommand, subGroup, lang }) {
    const getId = options.getString('id');
    if (isNaN(getId)) return await interaction.editReply({ content: `Id sadece sayıdan oluşmaktadır.\n(\`Id consists only of numbers.\`)`, ephemeral: true });
    const getReason = options.getString('reason');
    const getStaff = interaction.member.user.tag;
    const checkBlasklist = await getBlacklist({ id: getId, key: subGroup == 'user' ? `user:${getId}:blacklist` : `guild:${getId}:blacklist`, userr: subGroup === 'user' ? true : false });

    switch (subGroup) {
        case 'user':
            const checkUser = await users(getId);
            if (!checkUser) return await interaction.editReply({ content: `Kullanıcı bulunamadı.\n(\`User not found.\`)`, ephemeral: true });
            switch (subCommand) {
                case 'add':
                    if (checkBlasklist?.active === 'true') return interaction.editReply({ content: `Bu kullanıcı zaten karalistede.\nBilgi:\`\`\`\nSebep/Reason: ${checkBlasklist.reason}\nYetkili/Staff: ${checkBlasklist.staff}\nZaman/Time: ${checkBlasklist.expire}\n\`\`\``, ephemeral: true });
                    await setBlacklist({ id: getId, reason: getReason, staff: getStaff, userr: true, add: true, key: `user:${getId}:blacklist` });
                    await interaction.editReply({ content: `**${getId}** Idli kullanıcı kara listeye eklendi.\nSebep: \`\`\`\n${getReason.replace(/[`]/, '\`')}\`\`\``, ephemeral: true });
                    break;
                case 'remove':
                    if (checkBlasklist?.active === 'false') return interaction.editReply({ content: `Bu kullanıcı zaten karalistede değil.`, ephemeral: true });
                    await setBlacklist({ id: getId, reason: getReason, staff: getStaff, userr: true, add: false, key: `user:${getId}:blacklist` });
                    await interaction.editReply({ content: `**${getId}** Idli kullanıcı kara listeden çıkarıldı.`, ephemeral: true });
                    break;
            }
            break;
        case 'server':
            switch (subCommand) {
                case 'add':
                    if (checkBlasklist.active === 'true') return interaction.editReply({ content: `Bu sunucu zaten karalistede.\n(\`Kullanıcı zaten kara listeye alındı.\`)\nBilgi/Info:\`\`\`\nSebep/Reason: ${checkBlasklist.reason}\nYetkili/Staff: ${checkBlasklist.staff}\nZaman/Time: ${checkBlasklist.expire}\n\`\`\``, ephemeral: true });
                    await setBlacklist({ id: getId, reason: getReason, staff: getStaff, userr: false, add: true, key: `guild:${getId}:blacklist` });
                    await interaction.editReply({ content: `**${getId}** Idli sunucu kara listeye eklendi.\nSebep: \`\`\`\n${getReason.replace(/[`]/, '\`')}\`\`\``, ephemeral: true });
                    break;
                case 'remove':
                    if (checkBlasklist.active === 'false') return interaction.editReply({ content: `Bu sunucu zaten karalistede değil.`, ephemeral: true });
                    await setBlacklist({ id: getId, reason: getReason, staff: getStaff, userr: false, add: false, key: `guild:${getId}:blacklist` });
                    await interaction.editReply({ content: `**${getId}** Idli sunucu kara listeden çıkarıldı.`, ephemeral: true });
                    break;
            }
            break;
    }
}