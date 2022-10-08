import { PermissionsBitField } from "discord.js";

export default {
    'CREATE_INSTANT_INVITE': PermissionsBitField.Flags.CreateInstantInvite,
    'KICK_MEMBERS': PermissionsBitField.Flags.KickMembers,
    'BAN_MEMBERS': PermissionsBitField.Flags.BanMembers,
    'ADMINISTRATOR': PermissionsBitField.Flags.Administrator,
    'MANAGE_CHANNELS': PermissionsBitField.Flags.ManageChannels,
    'MANAGE_GUILD': PermissionsBitField.Flags.ManageGuild,
    'ADD_REACTIONS': PermissionsBitField.Flags.AddReactions,
    'VIEW_AUDIT_LOG': PermissionsBitField.Flags.ViewAuditLog,
    'PRIORITY_SPEAKER': PermissionsBitField.Flags.PrioritySpeaker,
    'STREAM': PermissionsBitField.Flags.Stream,
    'VIEW_CHANNEL': PermissionsBitField.Flags.ViewChannel,
    'SEND_MESSAGES': PermissionsBitField.Flags.SendMessages,
    'SEND_TTS_MESSAGES': PermissionsBitField.Flags.SendTTSMessages,
    'MANAGE_MESSAGES': PermissionsBitField.Flags.ManageMessages,
    'EMBED_LINKS': PermissionsBitField.Flags.EmbedLinks,
    'ATTACH_FILES': PermissionsBitField.Flags.AttachFiles,
    'READ_MESSAGE_HISTORY': PermissionsBitField.Flags.ReadMessageHistory,
    'MENTION_EVERYONE': PermissionsBitField.Flags.MentionEveryone,
    'USE_EXTERNAL_EMOJIS': PermissionsBitField.Flags.UseExternalEmojis,
    'VIEW_GUILD_INSIGHTS': PermissionsBitField.Flags.ViewGuildInsights,
    'CONNECT': PermissionsBitField.Flags.Connect,
    'SPEAK': PermissionsBitField.Flags.Speak,
    'MUTE_MEMBERS': PermissionsBitField.Flags.MuteMembers,
    'DEAFEN_MEMBERS': PermissionsBitField.Flags.DeafenMembers,
    'MOVE_MEMBERS': PermissionsBitField.Flags.MoveMembers,
    'USE_VAD': PermissionsBitField.Flags.UseVAD,
    'CHANGE_NICKNAME': PermissionsBitField.Flags.ChangeNickname,
    'MANAGE_NICKNAMES': PermissionsBitField.Flags.ManageNicknames,
    'MANAGE_ROLES': PermissionsBitField.Flags.ManageRoles,
    'MANAGE_WEBHOOKS': PermissionsBitField.Flags.ManageWebhooks,
    'MANAGE_EMOJIS': PermissionsBitField.Flags.ManageEmojisAndStickers
}