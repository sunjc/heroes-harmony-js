package io.itrunner.heroes.data;

import ohos.data.orm.OrmDatabase;
import ohos.data.orm.annotation.Database;

@Database(entities = {Hero.class}, version = 1)
public abstract class HeroStore extends OrmDatabase {
}