"use strict";describe("D3 rendering service",function(){var e,t,o,i,l,a;beforeEach(function(){angular.module("testModule",["ngLodash","kubernetesApp.components.graph"])}),beforeEach(module("testModule")),beforeEach(inject(function(c,n){e=c,t=n,o=d3.select("body").append("div"),o.style("width","500px"),o.style("height","500px"),i=o.append("div"),l={viewModelService:{viewModel:{configuration:{},data:s[0].data},setSelectionIdList:function(){}}},a=e.rendering().controllerScope(l).directiveElement(i.node()),l.viewModelService.viewModel.data=s[0].data,a()})),afterEach(function(){o.remove()}),it("should locate the dimensions of the parent",function(){var e=a.getParentContainerDimensions();expect(e[0]).toEqual(500),expect(e[1]).toEqual(500)}),it("should resize the graph implicitly and explicitly",function(){var e=a.graphSize();expect(e[0]).toEqual(484),expect(e[1]).toEqual(700),a.graphSize([750,750]);var t=a.graphSize();expect(t[0]).toEqual(750),expect(t[1]).toEqual(750)}),it('should respect "selected" property in view model',function(){var e=a.nodeSelection();expect(e.size).toEqual(3),expect(t.setHas(e,{id:1})).toBeTruthy(),expect(t.setHas(e,{id:2})).toBeTruthy(),expect(t.setHas(e,{id:3})).toBeTruthy()}),it("should completely replace node selection when explicitly set",function(){var e=new Set;e.add({id:2}),e.add({id:55}),a.nodeSelection(e);var o=a.nodeSelection();expect(o.size).toEqual(2),expect(t.setHas(o,{id:2})).toBeTruthy(),expect(t.setHas(o,{id:55})).toBeTruthy()}),it("should select appropriate edges with respect to selected nodes in view model",function(){var e=a.edgeSelection().values(),t=e.next();expect(t.done).toBeFalsy(),expect(t.value.source.id).toEqual(1),expect(t.value.target.id).toEqual(2),t=e.next(),expect(t.done).toBeFalsy(),expect(t.value.source.id).toEqual(1),expect(t.value.target.id).toEqual(3),t=e.next(),expect(t.done).toBeTruthy()}),it("should select appropriate edges with respect to explicitly set node selection",function(){var e=new Set;e.add({id:2}),e.add({id:55}),a.nodeSelection(e);var t=a.edgeSelection().values(),o=t.next();expect(o.done).toBeFalsy(),expect(o.value.source.id).toEqual(2),expect(o.value.target.id).toEqual(55),o=t.next(),expect(o.done).toBeTruthy()}),it("should select appropriate edgelabels with respect to selected nodes in view model",function(){var e=a.edgelabelsSelection().values(),t=e.next();expect(t.done).toBeFalsy(),expect(t.value.source.id).toEqual(1),expect(t.value.target.id).toEqual(2),t=e.next(),expect(t.done).toBeFalsy(),expect(t.value.source.id).toEqual(1),expect(t.value.target.id).toEqual(3),t=e.next(),expect(t.done).toBeTruthy()}),it("should select appropriate edgelabels with respect to explicitly set node selection",function(){var e=new Set;e.add({id:2}),e.add({id:55}),a.nodeSelection(e);var t=a.edgelabelsSelection().values(),o=t.next();expect(o.done).toBeFalsy(),expect(o.value.source.id).toEqual(2),expect(o.value.target.id).toEqual(55),o=t.next(),expect(o.done).toBeTruthy()}),it("should set opacity of selected nodes to 1, and opacity of all others to something else",function(){var e=a.nodeSelection();expect(e.size).toEqual(3),i.selectAll(".node").each(function(o){var i=d3.select(this).style("opacity");"1"===i?expect(t.setHas(e,o)).toBeTruthy():expect(t.setHas(e,o)).toBeFalsy()});var o=new Set;o.add({id:2}),o.add({id:55}),a.nodeSelection(o);var l=a.nodeSelection();expect(l.size).toEqual(2),i.selectAll(".node").each(function(e){var o=d3.select(this).style("opacity");"1"===o?expect(t.setHas(l,e)).toBeTruthy():expect(t.setHas(l,e)).toBeFalsy()})}),it("should set opacity of selected edges to 1, and opacity of all others to something else",function(){var e=a.edgeSelection();expect(e.size).toEqual(2),i.selectAll(".link").each(function(o){var i=d3.select(this).style("opacity");"1"===i?expect(t.setHas(e,o)).toBeTruthy():expect(t.setHas(e,o)).toBeFalsy()});var o=new Set;o.add({id:2}),o.add({id:55}),a.nodeSelection(o);var l=a.edgeSelection();expect(l.size).toEqual(1),i.selectAll(".link").each(function(e){var o=d3.select(this).style("opacity");"1"===o?expect(t.setHas(l,e)).toBeTruthy():expect(t.setHas(l,e)).toBeFalsy()})}),it("should set opacity of selected edgelabels to 1, and opacity of all others to something else",function(){var e=a.edgelabelsSelection();expect(e.size).toEqual(2),i.selectAll(".edgelabel").each(function(o){var i=d3.select(this).style("opacity");"1"===i?expect(t.setHas(e,o)).toBeTruthy():expect(t.setHas(e,o)).toBeFalsy()});var o=new Set;o.add({id:2}),o.add({id:55}),a.nodeSelection(o);var l=a.edgeSelection();expect(l.size).toEqual(1),i.selectAll(".edgelabel").each(function(e){var o=d3.select(this).style("opacity");"1"===o?expect(t.setHas(l,e)).toBeTruthy():expect(t.setHas(l,e)).toBeFalsy()})}),it("should set opacity of all nodes, edges, edgelabels and images to 1 when nothing is selected",function(){a.nodeSelection(new Set),i.selectAll(".node").each(function(){expect(d3.select(this).style("opacity")).toEqual("1")}),i.selectAll(".link").each(function(){expect(d3.select(this).style("opacity")).toEqual("1")}),i.selectAll(".edgelabel").each(function(){expect(d3.select(this).style("opacity")).toEqual("1")}),i.selectAll("image").each(function(){expect(d3.select(this).style("opacity")).toEqual("1")})}),it("should update node settings cache when node is pinned and unpinned",function(){a.togglePinned({id:2,fixed:0});var e=a.nodeSettingsCache();expect(e[2].fixed).toBeTruthy(),a.togglePinned({id:2,fixed:8}),e=a.nodeSettingsCache(),expect(e[2].fixed).toBeFalsy()}),it("should update node settings cache when pins are reset",function(){a.togglePinned({id:2,fixed:0}),a.togglePinned({id:3,fixed:0});var e=a.nodeSettingsCache();expect(e[2].fixed).toBeTruthy(),expect(e[3].fixed).toBeTruthy(),a.resetPins(),e=a.nodeSettingsCache();for(var t in e)expect(e[t].fixed).toBeFalsy()}),it("should update view settings cache when image is zoomed",function(){runs(function(){a.adjustZoom(.75)}),waitsFor(function(){return a.viewSettingsCache().scale<.77},"The view settings cache should be updated.",1e3),runs(function(){expect(a.viewSettingsCache().scale).toBeLessThan(.76)})});var s=[{name:"All Types",data:{nodes:[{name:"service: guestbook",radius:16,fill:"olivedrab",id:1,selected:!0},{name:"pod: guestbook-controller",radius:20,fill:"palegoldenrod",id:2,selected:!0},{name:"pod: guestbook-controller",radius:20,fill:"palegoldenrod",id:3,selected:!0},{name:"pod: guestbook-controller",radius:20,fill:"palegoldenrod",id:55},{name:"container: php-redis",radius:24,fill:"cornflowerblue",id:77}],links:[{source:0,target:1,width:2,stroke:"black",distance:80},{source:0,target:2,width:2,stroke:"black",distance:80},{source:1,target:3,width:2,stroke:"black",distance:80}],configuration:{settings:{clustered:!1,showEdgeLabels:!0,showNodeLabels:!0}}}}]});