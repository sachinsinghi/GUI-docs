# Startwith Filter
#
# Ussage: {{ string | startwith: 'string' }}
# Output: {boolen}

module Jekyll
	module RemoveLastFilter

		def remove_last(content)
			content.slice(0..-2)
		end

	end
end

Liquid::Template.register_filter(Jekyll::RemoveLastFilter)