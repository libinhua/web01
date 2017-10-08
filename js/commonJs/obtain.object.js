function getObj() {

	var list = [];

	$(".v").each(function (index, obj) {

		var name = $(obj).attr("name");
		var value = $(obj).val();
		var obj2 = {
			Name: name,
			Value: value
		}
		list.push(obj2);

	});

	var obj = {};
	$(list).each(function (index, data) {
		console.log(index, data.Name);
		obj[data.Name] = data.Value;
	});

	return JSON.stringify(obj);

}

