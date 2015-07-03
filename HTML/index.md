---
layout: default
title: GEL
weight: "010"
brand: [Brand]
---


brand: [brand]<br>
Brand: [Brand]<br>
Version: [Version]<br>
version: [version]<br>

The mission of the GEL is to deliver a **digital brand** that brings consistency and efficiency to building digital products for Westpac,
St. George, Bank of Melbourne and Bank SA.

This site provides a range of resources and tools that will help you successfully plan, design and develop our digital products.

{{ site.data.GUI.modules.Alerts[0].name }}

{% for version in site.data.GUI.modules.Alerts[0].versions %}
{{ version[0] | downcase }} {{ version[1].js }}
{% endfor %}