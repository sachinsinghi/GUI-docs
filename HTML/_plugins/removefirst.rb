# Startwith Filter
#
# Ussage: {{ string | remove_first }}
# Output: {boolen}

module Jekyll
	module RemoveFirstFilter

		def remove_first(content)
			content.drop(1)
		end

	end
end

Liquid::Template.register_filter(Jekyll::RemoveFirstFilter)