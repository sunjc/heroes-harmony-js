package io.itrunner.heroes.data;

import ohos.app.Context;
import ohos.rpc.MessageParcel;

import static ohos.utils.zson.ZSONObject.stringToClass;

public class HeroService {
    private static final int INSERT = 1001;
    private static final int UPDATE = 1003;
    private static final int DELETE = 1004;
    private static final int QUERY_TOP4 = 10021;
    private static final int QUERY_ALL = 10022;
    private static final int GET_ONE = 10023;
    private static final int QUERY_BY_NAME = 10024;

    private final HeroRepository repository;

    public HeroService(Context context) {
        repository = new HeroRepository(context);
    }

    public Object onRemoteRequest(int code, MessageParcel data) {
        Object result = null;

        switch (code) {
            case INSERT: {
                repository.insert(toHero(data));
                break;
            }
            case UPDATE: {
                repository.update(toHero(data));
                break;
            }
            case DELETE: {
                Hero param = toHero(data);
                repository.delete(param.getId());
                break;
            }
            case QUERY_TOP4: {
                result = repository.queryTop4();
                break;
            }
            case QUERY_ALL: {
                result = repository.queryAll();
                break;
            }
            case GET_ONE: {
                Hero param = toHero(data);
                result = repository.getOne(param.getId());
                break;
            }
            case QUERY_BY_NAME: {
                Hero param = toHero(data);
                result = repository.queryByName(param.getName());
                break;
            }
            default: {
                throw new IllegalArgumentException("service not defined");
            }
        }
        return result;
    }

    private static Hero toHero(MessageParcel data) {
        String zson = data.readString();
        return stringToClass(zson, Hero.class);
    }
}
