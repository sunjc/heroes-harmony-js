package io.itrunner.heroes;

import ohos.aafwk.content.Intent;
import ohos.ace.ability.AceAbility;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

import static io.itrunner.heroes.data.DBUtils.*;

public class MainAbility extends AceAbility {
    private static final String TAG = MainAbility.class.getSimpleName();
    private static final HiLogLabel LOG_LABEL = new HiLogLabel(HiLog.LOG_APP, 0x00102, TAG);

    @Override
    public void onStart(Intent intent) {
        HiLog.info(LOG_LABEL, "onStart");

        if (!existsDatabase(this)) {
            createDatabase(this);
            initDatabase(this);
        }

        HeroServiceInternalAbility.register(this);
        super.onStart(intent);

        setAbilitySliceAnimator(null);
    }

    @Override
    public void onStop() {
        HiLog.info(LOG_LABEL, "onStop");
        HeroServiceInternalAbility.deregister();
        super.onStop();
    }
}
