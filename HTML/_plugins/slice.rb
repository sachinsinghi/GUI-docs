# Startwith Filter
#
# Ussage: {{ string | slice: 2, 3 }}
# Output: {boolen}

module Jekyll
	module SliceFilter

		def slice(content, start, length)
			content[start, length]
		end

	end
end

Liquid::Template.register_filter(Jekyll::SliceFilter)