package io.itrunner.heroes.data;

import io.itrunner.heroes.ResourceTable;
import ohos.app.Context;
import ohos.data.DatabaseHelper;
import ohos.data.orm.OrmContext;
import ohos.global.resource.ResourceManager;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

import java.io.File;

public class DBUtils {
    private static final String DATABASE_NAME = "HeroStore.db";
    private static final String DATABASE_NAME_ALIAS = "HeroStore";
    private static final String DATABASE_DIR = "db";

    private static final HiLogLabel LOG_LABEL = new HiLogLabel(HiLog.LOG_APP, 0x00102, "Hero Database");

    public static void createDatabase(Context context) {
        HiLog.info(LOG_LABEL, "create database: %{private}s", DATABASE_NAME_ALIAS);

        DatabaseHelper helper = new DatabaseHelper(context);
        helper.getOrmContext(DATABASE_NAME_ALIAS, DATABASE_NAME, HeroStore.class);

        HiLog.info(LOG_LABEL, "local database path: %{public}s", context.getDatabaseDir().getPath());
    }

    public static void initDatabase(Context context) {
        HiLog.info(LOG_LABEL, "initial database ...");

        OrmContext ormContext = getOrmContext(context);
        try {
            ResourceManager resourceManager = context.getResourceManager();
            String[] heroes = resourceManager.getElement(ResourceTable.Strarray_heroes).getStringArray();

            for (String name : heroes) {
                ormContext.insert(new Hero(name));
            }

            ormContext.flush();
        } catch (Exception e) {
            HiLog.error(LOG_LABEL, e.getMessage());
        }
    }

    /**
     * @param destPath the path for backing up the database
     */
    public static void backupDatabase(Context context, String destPath) {
        HiLog.info(LOG_LABEL, "backup database to %{public}s", destPath);
        OrmContext ormContext = getOrmContext(context);
        ormContext.backup(destPath);
        ormContext.close();
    }

    /**
     * @param srcPath the path where the database file is stored
     */
    public static void restoreDatabase(Context context, String srcPath) {
        HiLog.info(LOG_LABEL, "restore database from %{public}s", srcPath);
        OrmContext ormContext = getOrmContext(context);
        ormContext.restore(srcPath);
        ormContext.close();
    }

    /**
     * @param name the database name, for example: HeroStore.db
     */
    public static void deleteDatabase(Context context, String name) {
        HiLog.info(LOG_LABEL, "delete database: %{public}s", name);
        DatabaseHelper helper = new DatabaseHelper(context);
        helper.deleteRdbStore(name);
    }

    public static boolean existsDatabase(Context context) {
        File[] files = context.getDatabaseDir().listFiles((file, name) -> DATABASE_DIR.equals(name));

        if (files.length == 0) {
            return false;
        }

        files = files[0].listFiles((file, name) -> DATABASE_NAME.equals(name));
        return files.length > 0;
    }

    static OrmContext getOrmContext(Context context) {
        DatabaseHelper helper = new DatabaseHelper(context);
        return helper.getOrmContext(DATABASE_NAME_ALIAS);
    }
}
