# Strip Filter
#
# Ussage: {{ string | strip }}
# Output: {string}

module Jekyll
	module StripFilter

		def strip( content )
			content.gsub /\n\s*\n/, "\n"
		end

	end
end

Liquid::Template.register_filter(Jekyll::StripFilter)