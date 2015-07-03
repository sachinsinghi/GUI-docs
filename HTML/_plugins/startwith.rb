# Startwith Filter
#
# Ussage: {{ string | startwith: 'string' }}
# Output: {boolen}

module Jekyll
	module StartWithFilter

		def startwith(content, start)
			content.start_with?(start)
		end

	end
end

Liquid::Template.register_filter(Jekyll::StartWithFilter)