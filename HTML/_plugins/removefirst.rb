# Startwith Filter
#
# Ussage: {{ string | startwith: 'string' }}
# Output: {boolen}

module Jekyll
	module RemoveFirstFilter

		def remove_first(content)
			content.drop(1)
		end

	end
end

Liquid::Template.register_filter(Jekyll::RemoveFirstFilter)