import Ember from 'ember';
import Breadcrumbs from 'ember-cli-admin/logics/breadcrumbs';
import SiteTitle from 'ember-cli-admin/logics/site-title';

export default  Ember.Mixin.create({

  getOutlet: function(controller, outletName){
    var outlet = "%@/%@".fmt(this._controllerName(controller).decamelize(), outletName);
    if (this.container._registry.has('template:%@'.fmt(outlet))) {
      return outlet;
    }
    if (this.container._registry.has("template:admin/%@".fmt(outletName))){
      return "admin/%@".fmt(outletName);
    }
    return "admin/%@".fmt(outletName);
  },

  _getControllerTemplate: function(controller) {
    var name;
    name = this._controllerName(controller);
    if (this.action) {
      name = "%@/%@".fmt(name, this.action);
    }
    if (name === "dashboard") {
      return "admin/dashboard";
    }
    if (this.container._registry.has('template:'+name) || this.container._registry.has('template:'+"admin/%@".fmt(name))) {
      return name;
    } else {
      if (this.action && this.action !== "page") {
        return "admin/%@".fmt(this.action);
      } else {
        return "admin/main";
      }
    }
  },

  _controllerName: function(controller) {
    return this.controllerName || (this.controllerName = controller._debugContainerKey.split(":")[1].replace(/(\/[Ss]how)|(\/[Ee]dit)|(\/[Nn]ew)/, ''));
  },
  _setActiveRoute: function(controller) {
    var url;
    url = this._controllerName(controller);
    return this.controllerFor("navigation").set('activeMenu', url);
  },
  _setAction: function(action) {
    if (action !== "index") {
      return this.action = action;
    }
  },
  _checkAction: function(options, target) {
    if (/\./.test(target)) {
      target = target.split(".")[1];
      if (target) {
        return options.action = target;
      }
    }
  },
  _setupBreadscrumbs: function(controller, model) {
    return Breadcrumbs.setup(this.action, controller, model, this.controllerFor('breadcrumbs'));
  },
  _setSiteTitle: function(controller, model) {
    return SiteTitle.setup(this._controllerName(controller), model, this.action);
  }
});
