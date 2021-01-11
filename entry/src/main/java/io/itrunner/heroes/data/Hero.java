package io.itrunner.heroes.data;

import ohos.data.orm.OrmObject;
import ohos.data.orm.annotation.Column;
import ohos.data.orm.annotation.Entity;
import ohos.data.orm.annotation.Index;
import ohos.data.orm.annotation.PrimaryKey;

@Entity(tableName = "hero", indices = {@Index(value = {"hero_name"}, name = "name_index", unique = true)})
public class Hero extends OrmObject {
    @PrimaryKey(autoGenerate = true)
    private Long id;

    @Column(name = "hero_name", notNull = true)
    private String name;

    public Hero() {
    }

    public Hero(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}