// constando dependências
const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const ms = require('ms');

// constando arquivos locais
const Database = require('../../schemas/infractions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('restringe a capacidade de um membro de se comunicar.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false)

		.addUserOption(options => options
			.setName('membro')
			.setDescription('selecione um membro para puní-lo.')
			.setRequired(true)
		)

		.addStringOption(options => options
			.setName('duração')
			.setDescription('determine a duração da punição (1m, 1h, 1d)')
			.setRequired(true)
		)

		.addStringOption(options => options
			.setName('motivo')
			.setDescription('esclareça o motivo para tal punição.')
			.setMaxLength(512)
		),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */

	async execute(interaction) {
		const { options, guild, member } = interaction;

		const target = options.getMember('membro');
		const duration = options.getString('duração');
		const reason = options.getString('motivo') || 'motivo ou razão não especificado...';

		const errorsArray = [];

		const errorsEmbed = new EmbedBuilder()
			.setColor('Red')
			.setAuthor({
				name: 'erro ao tentar aplicar timeout'
			});

		if (!target)
			return interaction.reply({
				embeds: [errorsEmbed.setDescription('membro não encontrado. ele provavelmente saiu do servidor...')],
				ephemeral: true
			});

		if (!ms(duration) || ms(duration) > ms('28d'))
			errorsArray.push('tempo de punição determinado é inválido ou passa do limite de 28 dias...');

		if (!target.manageable || !target.moderatable)
			errorsArray.push('o membro selecionado não pode ser moderável por mim...');

		if (member.roles.highest.position < target.roles.highest.position)
			errorsArray.push('o cargo do membro que você está tentando punir é maior que o seu...');

		if (errorsArray.length)
			return interaction.reply({
				embeds: [errorsEmbed.setDescription(errorsArray.join('\n'))],
				ephemeral: true
			});

		target.timeout(ms(duration), reason).catch((err) => {
			interaction.reply({
				embeds: [errorsEmbed.setDescription('não foi possível aplicar o timeout neste membro por conta de algum erro desconhecido...')]
			})

			return console.log('[✘] ocorreu um erro no comando timeout.js...', err);
		});

		const newInfractionsObject = {
			IssuerID: member.id,
			IssuerTag: member.user.tag,
			Reason: reason,
			Date: new Date.now()
		}

		let userData = await Database.findOne({
			Guild: guild.id,
			User: target.id
		});

		if (!userData)
			userData = await Database.create({
				Guild: guild.id,
				User: target.id,
				Infractions: [newInfractionsObject]
			});
		else
			userData.Infractions.push(newInfractionsObject) && await userData.save();

		const successEmbed = new EmbedBuilder()
			.setColor('Green')
			.setAuthor({
				name: 'timeout',
				iconURL: guild.iconURL()
			})
			.setDescription([
				`${member} aplicou um timeout de **${ms(ms(duration), {long: true})}** em ${target}.`,
				`o membro agora tem **${userData.Infractions.length} pontos** no total de infrações...`,
				`\nmotivo da punição: ${reason}`
			].join('\n'));

		return interaction.reply({
			embeds: [successEmbed]
		});
	}
}