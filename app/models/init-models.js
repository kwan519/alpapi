var DataTypes = require("sequelize").DataTypes;
var _access_sites = require("./access_sites");
var _api_keys = require("./api_keys");
var _block_components = require("./block_components");
var _data_imports = require("./data_imports");
var _ms_language = require("./ms_language");
var _page_types = require("./page_types");
var _quotes_n_bookings = require("./quotes_n_bookings");
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
  var data_imports = _data_imports(sequelize, DataTypes);
  var ms_language = _ms_language(sequelize, DataTypes);
  var page_types = _page_types(sequelize, DataTypes);
  var quotes_n_bookings = _quotes_n_bookings(sequelize, DataTypes);
  var site_settings = _site_settings(sequelize, DataTypes);
  var sites = _sites(sequelize, DataTypes);
  var templates_layout = _templates_layout(sequelize, DataTypes);
  var theme = _theme(sequelize, DataTypes);
  var tokens = _tokens(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  ms_language.belongsToMany(sites, { as: 'sites_id_site_sites_data_imports', through: data_imports, foreignKey: "ms_language_id_ms_language", otherKey: "sites_id_site" });
  sites.belongsToMany(ms_language, { as: 'ms_language_id_ms_language_ms_languages', through: data_imports, foreignKey: "sites_id_site", otherKey: "ms_language_id_ms_language" });
  sites.belongsToMany(theme, { as: 'theme_id_theme_themes', through: templates_layout, foreignKey: "sites_id_site", otherKey: "theme_id_theme" });
  sites.belongsToMany(users, { as: 'users_id_user_users', through: access_sites, foreignKey: "sites_id_site", otherKey: "users_id_user" });
  templates_layout.belongsToMany(templates_layout, { as: 'id_site_templates_layouts', through: page_types, foreignKey: "id_template_layout", otherKey: "id_site" });
  templates_layout.belongsToMany(templates_layout, { as: 'id_template_layout_templates_layouts', through: page_types, foreignKey: "id_site", otherKey: "id_template_layout" });
  theme.belongsToMany(sites, { as: 'sites_id_site_sites_templates_layouts', through: templates_layout, foreignKey: "theme_id_theme", otherKey: "sites_id_site" });
  theme.belongsToMany(theme, { as: 'id_site_themes', through: block_components, foreignKey: "id_theme", otherKey: "id_site" });
  theme.belongsToMany(theme, { as: 'id_theme_themes', through: block_components, foreignKey: "id_site", otherKey: "id_theme" });
  users.belongsToMany(sites, { as: 'sites_id_site_sites', through: access_sites, foreignKey: "users_id_user", otherKey: "sites_id_site" });
  data_imports.belongsTo(ms_language, { as: "ms_language_id_ms_language_ms_language", foreignKey: "ms_language_id_ms_language"});
  ms_language.hasMany(data_imports, { as: "data_imports", foreignKey: "ms_language_id_ms_language"});
  access_sites.belongsTo(sites, { as: "sites_id_site_site", foreignKey: "sites_id_site"});
  sites.hasMany(access_sites, { as: "access_sites", foreignKey: "sites_id_site"});
  api_keys.belongsTo(sites, { as: "sites_id_site_site", foreignKey: "sites_id_site"});
  sites.hasMany(api_keys, { as: "api_keys", foreignKey: "sites_id_site"});
  data_imports.belongsTo(sites, { as: "sites_id_site_site", foreignKey: "sites_id_site"});
  sites.hasMany(data_imports, { as: "data_imports", foreignKey: "sites_id_site"});
  site_settings.belongsTo(sites, { as: "sites_id_site_site", foreignKey: "sites_id_site"});
  sites.hasMany(site_settings, { as: "site_settings", foreignKey: "sites_id_site"});
  templates_layout.belongsTo(sites, { as: "sites_id_site_site", foreignKey: "sites_id_site"});
  sites.hasMany(templates_layout, { as: "templates_layouts", foreignKey: "sites_id_site"});
  theme.belongsTo(sites, { as: "sites_id_site_site", foreignKey: "sites_id_site"});
  sites.hasMany(theme, { as: "themes", foreignKey: "sites_id_site"});
  tokens.belongsTo(sites, { as: "sites_id_site_site", foreignKey: "sites_id_site"});
  sites.hasMany(tokens, { as: "tokens", foreignKey: "sites_id_site"});
  page_types.belongsTo(templates_layout, { as: "id_template_layout_templates_layout", foreignKey: "id_template_layout"});
  templates_layout.hasMany(page_types, { as: "page_types", foreignKey: "id_template_layout"});
  page_types.belongsTo(templates_layout, { as: "id_site_templates_layout", foreignKey: "id_site"});
  templates_layout.hasMany(page_types, { as: "id_site_page_types", foreignKey: "id_site"});
  block_components.belongsTo(theme, { as: "id_theme_theme", foreignKey: "id_theme"});
  theme.hasMany(block_components, { as: "block_components", foreignKey: "id_theme"});
  block_components.belongsTo(theme, { as: "id_site_theme", foreignKey: "id_site"});
  theme.hasMany(block_components, { as: "id_site_block_components", foreignKey: "id_site"});
  templates_layout.belongsTo(theme, { as: "theme_id_theme_theme", foreignKey: "theme_id_theme"});
  theme.hasMany(templates_layout, { as: "templates_layouts", foreignKey: "theme_id_theme"});
  access_sites.belongsTo(users, { as: "users_id_user_user", foreignKey: "users_id_user"});
  users.hasMany(access_sites, { as: "access_sites", foreignKey: "users_id_user"});

  return {
    access_sites,
    api_keys,
    block_components,
    data_imports,
    ms_language,
    page_types,
    quotes_n_bookings,
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
