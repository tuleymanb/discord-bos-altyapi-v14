import { Colors, EmbedBuilder } from "discord.js"

export default ({ fields, emUrl, emThumb, emImage, footer, emTitle, emTime, description, author, color }) => {
    const embed = new EmbedBuilder()
    if (fields) for (let i = 0; i < fields.length; i++) { const fld = fields[i]; embed.addFields({ name: fld.name, value: fld.value, inline: fld.inline }) }
    if (emUrl) embed.setURL(emUrl)
    if (emThumb) embed.setThumbnail({ url: emThumb })
    if (emTime) embed.setTimestamp()
    if (emImage) embed.setImage(emImage)
    if (emTitle) embed.setTitle(emTitle)
    if (author) embed.setAuthor({ name: author.name, iconURL: author.iconURL, url: author.url })
    if (description) embed.setDescription(description)
    if (footer) embed.setFooter({ text: footer.text, iconURL: footer.iconURL })
    if (color) {
        if (color === "error") embed.setColor('DarkPurple')
        else if (color === "random") embed.setColor(Colors.random())
        else embed.setColor('Fuchsia')
    } else embed.setColor('Fuchsia')
    // embed.setColor(errorC === true ? wrongcolor : color)
    return embed;
}