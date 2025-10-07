const User = require("./userModel");
const City = require("./cityModel");
const Tree = require("./treeModel");
const Photo = require("./photoModel");
const Moderation = require("./moderationModel");
const Block = require("./blockModel");

function associateModels() {
  User.belongsTo(City, { foreignKey: "city_id", as: "city" });
  City.hasMany(User, { foreignKey: "city_id", as: "users" });

  User.hasMany(Tree, { foreignKey: "user_id", as: "trees" });
  Tree.belongsTo(User, { foreignKey: "user_id", as: "user" });

  City.hasMany(Tree, { foreignKey: "city_id", as: "trees" });
  Tree.belongsTo(City, { foreignKey: "city_id", as: "city" });

  User.hasMany(Photo, { foreignKey: "user_id", as: "photos" });
  Photo.belongsTo(User, { foreignKey: "user_id", as: "user" });

  Tree.hasMany(Photo, { foreignKey: "tree_id", as: "photos" });
  Photo.belongsTo(Tree, { foreignKey: "tree_id", as: "tree" });

  Moderation.belongsTo(User, { foreignKey: "user_id", as: "user" });
  User.hasMany(Moderation, { foreignKey: "user_id", as: "moderations" });

  Moderation.belongsTo(Tree, { foreignKey: "tree_id", as: "tree" });
  Tree.hasMany(Moderation, { foreignKey: "tree_id", as: "moderations" });

  City.hasMany(Moderation, { foreignKey: "city_id", as: "moderations" });
  Moderation.belongsTo(City, { foreignKey: "city_id", as: "city" });

  User.hasMany(Block, {foreignKey: "user_id",as: "blocksMade",});
  User.hasMany(Block, {foreignKey: "blocked_user_id",as: "blocksReceived"});

  Block.belongsTo(User, {foreignKey: "user_id", as: "blocker",});
  Block.belongsTo(User, {foreignKey: "blocked_user_id",as: "blocked",});
}

module.exports = associateModels;
