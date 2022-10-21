var DataTypes = require("sequelize").DataTypes;
var _access_sites = require("./access_sites");
var _api_keys = require("./api_keys");
var _block_components = require("./block_components");
var _crm_call365 = require("./crm_call365");
var _data_imports = require("./data_imports");
var _formfills = require("./formfills");
var _images = require("./images");
var _ms_language = require("./ms_language");
var _outsource_api_key_value = require("./outsource_api_key_value");
var _page_types = require("./page_types");
var _site_settings = require("./site_settings");
var _sites = require("./sites");
var _templates_layout = require("./templates_layout");
var _theme = require("./theme");
var _tokens = require("./tokens");
var _users = require("./users");

function initModels(sequelize) {
  var access_sites = _access_sites(sequelize, DataTypes);
  var api_keys = _api_keys(sequelize, DataTypes);
  var block_components = _block_components(sequelize, DataTypes);
  var crm_call365 = _crm_call365(sequelize, DataTypes);
  var data_imports = _data_imports(sequelize, DataTypes);
  var formfills = _formfills(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var ms_language = _ms_language(sequelize, DataTypes);
  var outsource_api_key_value = _outsource_api_key_value(sequelize, DataTypes);
  var page_types = _page_types(sequelize, DataTypes);
  var site_settings = _site_settings(sequelize, DataTypes);
  var sites = _sites(sequelize, DataTypes);
  var templates_layout = _templates_layout(sequelize, DataTypes);
  var theme = _theme(sequelize, DataTypes);
  var tokens = _tokens(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  api_keys.belongsToMany(api_keys, { as: 'sites_id_api_keys', through: outsource_api_key_value, foreignKey: "api_keys_id", otherKey: "sites_id" });
  api_keys.belongsToMany(api_keys, { as: 'api_keys_id_api_keys', through: outsource_api_key_value, foreignKey: "sites_id", otherKey: "api_keys_id" });
  ms_language.belongsToMany(sites, { as: 'sites_id_sites_data_imports', through: data_imports, foreignKey: "ms_language_id", otherKey: "sites_id" });
  sites.belongsToMany(ms_language, { as: 'ms_language_id_ms_languages', through: data_imports, foreignKey: "sites_id", otherKey: "ms_language_id" });
  sites.belongsToMany(theme, { as: 'theme_id_theme_templates_layouts', through: templates_layout, foreignKey: "sites_id", otherKey: "theme_id" });
  sites.belongsToMany(users, { as: 'users_id_users', through: access_sites, foreignKey: "sites_id", otherKey: "users_id" });
  templates_layout.belongsToMany(templates_layout, { as: 'site_id_templates_layouts', through: page_types, foreignKey: "template_layout_id", otherKey: "site_id" });
  templates_layout.belongsToMany(templates_layout, { as: 'template_layout_id_templates_layouts', through: page_types, foreignKey: "site_id", otherKey: "template_layout_id" });
  theme.belongsToMany(sites, { as: 'sites_id_sites_templates_layouts', through: templates_layout, foreignKey: "theme_id", otherKey: "sites_id" });
  theme.belongsToMany(theme, { as: 'site_id_themes', through: block_components, foreignKey: "theme_id", otherKey: "site_id" });
  theme.belongsToMany(theme, { as: 'theme_id_themes', through: block_components, foreignKey: "site_id", otherKey: "theme_id" });
  users.belongsToMany(sites, { as: 'sites_id_sites', through: access_sites, foreignKey: "users_id", otherKey: "sites_id" });
  outsource_api_key_value.belongsTo(api_keys, { as: "api_key", foreignKey: "api_keys_id"});
  api_keys.hasMany(outsource_api_key_value, { as: "outsource_api_key_values", foreignKey: "api_keys_id"});
  outsource_api_key_value.belongsTo(api_keys, { as: "site", foreignKey: "sites_id"});
  api_keys.hasMany(outsource_api_key_value, { as: "sites_outsource_api_key_values", foreignKey: "sites_id"});
  data_imports.belongsTo(ms_language, { as: "ms_language", foreignKey: "ms_language_id"});
  ms_language.hasMany(data_imports, { as: "data_imports", foreignKey: "ms_language_id"});
  access_sites.belongsTo(sites, { as: "site", foreignKey: "sites_id"});
  sites.hasMany(access_sites, { as: "access_sites", foreignKey: "sites_id"});
  api_keys.belongsTo(sites, { as: "site", foreignKey: "sites_id"});
  sites.hasMany(api_keys, { as: "api_keys", foreignKey: "sites_id"});
  crm_call365.belongsTo(sites, { as: "site", foreignKey: "sites_id"});
  sites.hasMany(crm_call365, { as: "crm_call365s", foreignKey: "sites_id"});
  data_imports.belongsTo(sites, { as: "site", foreignKey: "sites_id"});
  sites.hasMany(data_imports, { as: "data_imports", foreignKey: "sites_id"});
  formfills.belongsTo(sites, { as: "site", foreignKey: "sites_id"});
  sites.hasMany(formfills, { as: "formfills", foreignKey: "sites_id"});
  images.belongsTo(sites, { as: "site", foreignKey: "sites_id"});
  sites.hasMany(images, { as: "images", foreignKey: "sites_id"});
  site_settings.belongsTo(sites, { as: "site", foreignKey: "sites_id"});
  sites.hasMany(site_settings, { as: "site_settings", foreignKey: "sites_id"});
  templates_layout.belongsTo(sites, { as: "site", foreignKey: "sites_id"});
  sites.hasMany(templates_layout, { as: "templates_layouts", foreignKey: "sites_id"});
  theme.belongsTo(sites, { as: "site", foreignKey: "sites_id"});
  sites.hasMany(theme, { as: "themes", foreignKey: "sites_id"});
  tokens.belongsTo(sites, { as: "site", foreignKey: "sites_id"});
  sites.hasMany(tokens, { as: "tokens", foreignKey: "sites_id"});
  page_types.belongsTo(templates_layout, { as: "template_layout", foreignKey: "template_layout_id"});
  templates_layout.hasMany(page_types, { as: "page_types", foreignKey: "template_layout_id"});
  page_types.belongsTo(templates_layout, { as: "site", foreignKey: "site_id"});
  templates_layout.hasMany(page_types, { as: "site_page_types", foreignKey: "site_id"});
  block_components.belongsTo(theme, { as: "theme", foreignKey: "theme_id"});
  theme.hasMany(block_components, { as: "block_components", foreignKey: "theme_id"});
  block_components.belongsTo(theme, { as: "site", foreignKey: "site_id"});
  theme.hasMany(block_components, { as: "site_block_components", foreignKey: "site_id"});
  templates_layout.belongsTo(theme, { as: "theme", foreignKey: "theme_id"});
  theme.hasMany(templates_layout, { as: "templates_layouts", foreignKey: "theme_id"});
  access_sites.belongsTo(users, { as: "user", foreignKey: "users_id"});
  users.hasMany(access_sites, { as: "access_sites", foreignKey: "users_id"});

  return {
    access_sites,
    api_keys,
    block_components,
    crm_call365,
    data_imports,
    formfills,
    images,
    ms_language,
    outsource_api_key_value,
    page_types,
    site_settings,
    sites,
    templates_layout,
    theme,
    tokens,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
