/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : class_tab

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2019-06-21 17:07:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article_tab
-- ----------------------------
DROP TABLE IF EXISTS `article_tab`;
CREATE TABLE `article_tab` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `catalog_ID` int(10) DEFAULT NULL,
  `author` varchar(255) NOT NULL,
  `view` int(10) NOT NULL,
  `comment` int(10) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `banner_img_src` varchar(255) NOT NULL,
  `list_img_src` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_time` bigint(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_tab
-- ----------------------------
INSERT INTO `article_tab` VALUES ('6', '测试1', '6', '魔尊六道zz', '12', '123', '犀牛书', 'upload_4c0aa0d61a59cba8fe92759575bd9e36', 'upload_8456494454f4f12c0de4684945294311', '犀牛书好厉害', '1561075200');
INSERT INTO `article_tab` VALUES ('8', '测试2', '16', 'zz', '12', '12', '时间', 'upload_5e15cad2f2645eec80949db6bac41164', 'upload_e76a813f9a25d1cc2ae0dfba6a37f790', '......', '673747200');
INSERT INTO `article_tab` VALUES ('9', '测试3', '6', 'pps', '23', '123', '策划', 'upload_104c40a81ec06dcbe94a1d1dae0d3bd5', 'upload_c7e16bfe56a0c3991cc6a1b7c2de44fc', '策划', '1560988800');

-- ----------------------------
-- Table structure for banner_tab
-- ----------------------------
DROP TABLE IF EXISTS `banner_tab`;
CREATE TABLE `banner_tab` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `src` varchar(255) NOT NULL,
  `href` varchar(255) NOT NULL,
  `serial` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner_tab
-- ----------------------------
INSERT INTO `banner_tab` VALUES ('49', '测试2', 'upload_427ca229310975c6b3b41045846c284c', 'www.cc.com', '1232465333');
INSERT INTO `banner_tab` VALUES ('50', '测试3', 'upload_78ebdf8a53978856358e5043a99df03d', 'www.ccxx111.com', '45');
INSERT INTO `banner_tab` VALUES ('51', '0.0.7', 'upload_344ee6feadca2c511e6289467d05c8b0', 'www.baidux.com', '23');
INSERT INTO `banner_tab` VALUES ('55', '0.0.8', 'upload_98b703bbf1f02762e55272d9a804bdec', 'www.baidu.com', '23');

-- ----------------------------
-- Table structure for catalog_tab
-- ----------------------------
DROP TABLE IF EXISTS `catalog_tab`;
CREATE TABLE `catalog_tab` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of catalog_tab
-- ----------------------------
INSERT INTO `catalog_tab` VALUES ('5', 'css3');
INSERT INTO `catalog_tab` VALUES ('6', 'javascript');
INSERT INTO `catalog_tab` VALUES ('7', 'xhtml');
INSERT INTO `catalog_tab` VALUES ('16', 'https');

-- ----------------------------
-- Table structure for tab
-- ----------------------------
DROP TABLE IF EXISTS `tab`;
CREATE TABLE `tab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tab
-- ----------------------------
INSERT INTO `tab` VALUES ('1', '小红', '10');
INSERT INTO `tab` VALUES ('2', '小张', '20');
INSERT INTO `tab` VALUES ('3', '小兰', '22');
