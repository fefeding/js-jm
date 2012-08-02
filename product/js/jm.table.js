/**
* 表格插件
* 
* @param {Object} option json格式参数，
className:表示当前表格采用的样式,
parent:表示表格被加载到哪个容器
id:为当前表格的ID，
header:一个字符串数组，表示当当前表格的表头
* 
* @namespace $jm
* @class $jm.table
**/
$jm.table = function (option) {
    /**
    * 当前表格的ID
    * @property id 
    * @type String
    **/
    this.id = option.id;

    //当前表格对象
    var table = $jm.table.createTable(option.header, option.className);

    /**
    * 表格行的集合
    * 集合中每个行对象都是一个数组，里面为当前行的所有单元格值
    * @property rows 
    * @type Array
    **/
    this.rows = [];

    /**
    * 添加行
    * @function createTable 
    * @param {Object} params 行信息的json格式数据,id为当前行的id,cells为一个表示单元格的数组
    * @param {String} css 表格的样式名，默认为 jm-table
    * @for $jm.table
    * @return 当前行
    **/
    this.insertRow = function (params) {
        if (params) {
            this.rows.push(params);
        }
    };

    /**
    * 展显当前表格
    * @function render 
    * @param {Object} params 行信息的json格式数据,id为当前行的id,cells为一个表示单元格的数组
    * @param {String} css 表格的样式名，默认为 jm-table
    * @for $jm.table
    * @return Object 当前生成的表格对象
    **/
    this.render = function () {
        for (var i in this.rows) {
            var r = this.rows[i];
            var row = document.createElement('tr');
            if (i % 2 == 0) row.className = "even"; //偶数样式
            if (r.id) row.id = r.id;
            if (r && r.length > 0) {
                for (var i in r) {
                    var c = document.createElement('td');
                    c.innerHTML = r[i];
                    row.appendChild(c);
                }
            }
            table.appendChild(row);
        }

        return table;
    }

    if (option.parent) {
        var p = document.getElementById(option.parent);
        if (p) {
            //加入到父容器中
            p.appendChild(table);
        }
    }
};

/**
* 创建一个表格对象
* @function createTable 
* @param {Array} header 表头的数组
* @param {String} css 表格的样式名，默认为 jm-table
* @for $jm.table
**/
$jm.table.createTable = function (header, css) {
    var tb = document.createElement('table');
    tb.className = css || 'jm-table';
    if (header && header.length > 0) {
        var head = tb.createTHead();
        for (var i in header) {
            var h = document.createElement('th');
            h.innerHTML = header[i];
            head.appendChild(h);
        }
    }
    return tb;
};