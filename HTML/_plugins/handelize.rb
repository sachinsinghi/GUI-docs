# Handleize Filter
#
# Ussage: {{ string | handleize }}
# Output: {string}

module Jekyll
	module HandleFilter

		def handleize(content)
			content.to_s.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
		end

	end
end

Liquid::Template.register_filter(Jekyll::HandleFilter)