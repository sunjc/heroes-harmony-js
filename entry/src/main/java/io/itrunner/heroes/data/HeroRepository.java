package io.itrunner.heroes.data;

import ohos.app.Context;
import ohos.data.orm.OrmContext;
import ohos.data.orm.OrmPredicates;
import ohos.data.rdb.ValuesBucket;

import java.util.List;

public class HeroRepository {
    private static final String ID = "id";
    private static final String HERO_NAME = "hero_name";

    private final OrmContext ormContext;

    public HeroRepository(Context context) {
        ormContext = DBUtils.getOrmContext(context);
    }

    public List<Hero> queryTop4() {
        OrmPredicates predicates = ormContext.where(Hero.class);
        predicates.orderByAsc(HERO_NAME);
        predicates.limit(4);
        return ormContext.query(predicates);
    }

    public List<Hero> queryAll() {
        OrmPredicates predicates = ormContext.where(Hero.class);
        predicates.orderByAsc(HERO_NAME);
        return ormContext.query(predicates);
    }

    public Hero getOne(Long id) {
        OrmPredicates predicates = ormContext.where(Hero.class);
        predicates.equalTo(ID, id);
        List<Hero> heroes = ormContext.query(predicates);
        return heroes.isEmpty() ? null : heroes.get(0);
    }

    public List<Hero> queryByName(String name) {
        OrmPredicates predicates = ormContext.where(Hero.class);
        predicates.contains(HERO_NAME, name);
        predicates.orderByAsc(HERO_NAME);
        return ormContext.query(predicates);
    }

    public void insert(Hero hero) {
        ormContext.insert(hero);
        ormContext.flush();
    }

    public void update(Hero hero) {
        OrmPredicates predicates = ormContext.where(Hero.class);
        predicates.equalTo(ID, hero.getId());

        ValuesBucket valuesBucket = new ValuesBucket();
        valuesBucket.putString(HERO_NAME, hero.getName());
        ormContext.update(predicates, valuesBucket);
    }

    public void delete(Long id) {
        OrmPredicates predicates = ormContext.where(Hero.class);
        predicates.equalTo(ID, id);
        ormContext.delete(predicates);
        ormContext.flush();
    }
}
