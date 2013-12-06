'use strict';

(function () {
  var module = angular.module('toHELL');

  module.factory('elementService', ['packageService', function(packageService) {
      function ElementServiceInstance() {  
        /**
         * 选中一个元素
         * @func selectElement
         * @param {number} elementIndex 该元素的索引值
         * @todo 目前考虑自动选中第一个action，时机成熟时移除
         */
        this.selectElement = function (element) {
          packageService.editStat.selectedElement = element;
        };
  
        /**
         * 释放选中的元素。释放时会连带释放动作的选中。
         * @func deselectElement
         */
        this.deselectElement = function () {
          packageService.editStat.selectedElement = null;
        };
  
        /**
         * 增加一个hotspot元素
         * @func addHotspotElement
         */
        this.addHotspotElement = function () {
          var scene = packageService.editStat.selectedScene;
          var newElement = {
            // 默认参数
            type: 'hotspot',
            posX: 100,
            posY: 300,
            width: 120,
            height: 42,
            actions: []
          };
          scene.elements.push(newElement);
          this.selectElement(newElement);
        };
  
      }
      return new ElementServiceInstance();
    }]);
})();
