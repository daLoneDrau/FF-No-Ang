/**
 * 
 */
define(['require', 'com/dalonedrow/engine/systems/base/interactive',
	'com/dalonedrow/rpg/base/constants/behaviourglobals',
	'com/dalonedrow/rpg/base/constants/equipmentglobals',
	'com/dalonedrow/rpg/base/constants/ioglobals',
	'com/dalonedrow/rpg/base/constants/scriptglobals',
	'com/dalonedrow/rpg/base/flyweights/behaviourdata',
	'com/dalonedrow/rpg/base/flyweights/iocharacter',
	'com/dalonedrow/rpg/base/systems/script'],
		function(require, Interactive, BehaviourGlobals, EquipmentGlobals, IoGlobals, ScriptGlobals,
				BehaviourData, IOCharacter, Script) {
	function IoNpcData() {
		IOCharacter.call(this);
	    var absorb = 0;
	    var aiming_start = 0;
	    var aimtime = 0;
	    var armor_class = 0;
	    var armorClass = 0;
	    var backstab_skill = 0;
	    var behavior = 0;
	    var behavior_param = 0;
	    var climb_count = 0;
	    var collid_state = 0;
	    var collid_time = 0;
	    var critical = 0;
	    var cut = 0;
	    var cuts = 0;
	    var damages = 0;
	    var detect = 0;
	    var fDetect = 0;
	    var fightdecision = 0;
	    /** the {@link IoNpcData}'s gender. */
	    var gender = null;
	    /** the IO associated with this {@link IoNpcData}. */
	    var io = null;
	    var lastmouth = 0;
	    var life = 0;
	    var look_around_inc = 0;
	    var ltemp = 0;
	    var mana = 0;
	    var maxlife = 0;
	    var maxmana = 0;
	    var movemode = 0;
	    var moveproblem = 0;
	    /** the {@link IoNpcData}'s name. */
	    var name = "";
	    /** all NPC flags. */
	    var npcFlags = 0;
	    // IO_PATHFIND pathfind;
	    // EERIE_EXTRA_ROTATE * ex_rotate;
	    // D3DCOLOR blood_color;
	    var padd = '';
	    var pathfinder = null;
	    // IO_BEHAVIOR_DATA stacked[MAX_STACKED_BEHAVIOR];
	    var poisonned = 0;
	    var reach = 0;
	    var reachedtarget = false; // Is
	    // target
	    // in
	    // REACHZONE ?
	    var reachedtime = 0;
	    var resist_fire = 0;
	    var resist_magic = 0;
	    var resist_poison = 0;
	    var speakpitch = 0;
	    var splatDamages = 0;
	    var splatTotNb = 0;
	    /** the stack of behaviors. */
	    var stacked = [];
	    var stare_factor = 0;
	    var strike_time = 0;
	    var tactics = 0; // 0=none
	    var targetInfo = 0;
	    // ;
	    /** the {@link IoNpcData}'s title. */
	    var title = null;
	    // 1=side ;
	    // 2=side+back
	    var tohit = 0;
	    var unused = 0;
	    // EERIE_3D last_splat_pos;
	    var vvpos = 0;
	
	    var walk_start_time = 0;
	    /** the NPC's weapon. */
	    var weapon = null;
	    var weaponInHand = 0;
	    var weaponname = '';
	    var weapontype = 0;
	    var xpvalue = 0;
		IoNpcData.MAX_STACKED_BEHAVIOR = 5;
        for (var i = 0; i < IoNpcData.MAX_STACKED_BEHAVIOR; i++) {
        	stacked.push(new BehaviourData());
        }
        // pathfinder = new IOPathfind();
	    /**
	     * Adds a behavior flag.
	     * @param flag the flag
	     */
	    this.addBehavior = function(flag) {
	        if (flag
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
	        	behavior |= flag;
	        } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.addBehavior() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * Adds an NPC flag.
	     * @param flag the flag
	     */
	    this.addNPCFlag = function(flag) {
	        if (flag
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
	        	npcFlags |= flag;
	        } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.addNPCFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * Applies extra damage from a poisoned attack.
	     * @param srcIoid the source of the damage
	     * @param isSpellDamage flag indicating whether the damage is from a spell
	     * @throws RPGException if an error occurs
	     */
	    var applyPoisonDamage = function(srcIoid, isSpellDamage) {
	    	if (srcIoid && isSpellDamage) {
		        if (srcIoid === null
		                || isSpellDamage === null) {
		            var s = [];
		            s.push("ERROR! IoNpcData.applyPoisonDamage() - ");
		            s.push("null value sent in parameters");
		            throw new Error(s.join(""));
		        }
		        if (isNaN(srcIoid)
		                || parseInt(Number(srcIoid)) !== srcIoid
		                || isNaN(parseInt(srcIoid, 10))) {
		            var s = [];
		            s.push("ERROR! IoNpcData.applyPoisonDamage() - ");
		            s.push("srcIoid must be an integer");
		            throw new Error(s.join(""));
		        }
		        if (typeof isSpellDamage !== "boolean") {
		            var s = [];
		            s.push("ERROR! IoNpcData.applyPoisonDamage() - ");
		            s.push("isSpellDamage must be a boolean");
		            throw new Error(s.join(""));
		        }
		        if (Interactive.getInstance().hasIO(srcIoid)) {
		            var poisonWeaponIO = null;
		            var sourceIO = Interactive.getInstance().getIO(srcIoid);
		            if (sourceIO.hasIOFlag(IoGlobals.IO_01_PC)) {
		            	var player = sourceIO.getPCData();
		                if (player.getEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON) > 0
		                        && Interactive.getInstance().hasIO(player.getEquippedItem(
		                        		EquipmentGlobals.EQUIP_SLOT_WEAPON))) {
		                    poisonWeaponIO = Interactive.getInstance().getIO(player.getEquippedItem(
		                    		EquipmentGlobals.EQUIP_SLOT_WEAPON));		
		                    if (poisonWeaponIO !== null
		                            && (poisonWeaponIO.getPoisonLevel() === 0
		                                    || poisonWeaponIO.getPoisonCharges() === 0)
		                            || isSpellDamage) {
		                        poisonWeaponIO = null;
		                    }
		                }
		            } else {
		                if (sourceIO.hasIOFlag(IoGlobals.IO_03_NPC)) {
		                    poisonWeaponIO = sourceIO.getNPCData().getWeapon();
		                    if (poisonWeaponIO !== null
		                            && (poisonWeaponIO.getPoisonLevel() === 0
		                                    || poisonWeaponIO.getPoisonCharges() === 0)) {
		                        poisonWeaponIO = null;
		                    }
		                }
		            }
		            if (poisonWeaponIO === null) {
		                poisonWeaponIO = sourceIO;
		            }
		            if (poisonWeaponIO !== null
		                    && poisonWeaponIO.getPoisonLevel() > 0
		                    && poisonWeaponIO.getPoisonCharges() > 0) {
		                // TODO - apply poison damage
		
		                // reduce poison level on attacking weapon
		                if (poisonWeaponIO.getPoisonCharges() > 0) {
		                    poisonWeaponIO.setPoisonCharges(
		                            poisonWeaponIO.getPoisonCharges() - 1);
		                }
		            }
		            sourceIO = null;
		            poisonWeaponIO = null;
		        }
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.applyPoisonDamage() - ");
	            s.push("requires 2 parameters");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * Drains mana from the NPC, returning the full amount drained.
	     * @param dmg the attempted amount of mana to be drained
	     * @return {@link float}
	     */
	    this.ARX_DAMAGES_DrainMana = function(dmg) {
	        var manaDrained = 0;
		    if (dmg
		    		&& dmg !== null
		    		&& !isNaN(dmg)) {
		        if (this.getBaseMana() >= dmg) {
		            this.adjustMana(-dmg);
		            manaDrained = dmg;
		        } else {
		            manaDrained = this.getBaseMana();
		            this.adjustMana(-manaDrained);
		        }
		    } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.ARX_DAMAGES_DrainMana() - ");
	            s.push("argument must be floating-point");
	            throw new Error(s.join(""));
		    }
	        return manaDrained;
	    }
	    /**
	     * Heals the NPC's mana.
	     * @param dmg the amount of healing
	     */
	    this.ARX_DAMAGES_HealManaInter = function(dmg) {
		    if (dmg
		    		&& dmg !== null
		    		&& !isNaN(dmg)) {
		        if (this.getBaseLife() > 0) {
		            if (dmg > 0) {
		            	this.adjustMana(dmg);
		            }
		        }
		    } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.ARX_DAMAGES_HealManaInter() - ");
	            s.push("argument must be floating-point");
	            throw new Error(s.join(""));
		    }
	    }
	    this.ARX_NPC_Behaviour_Change = function(newBehavior, params) {
	    	if (newBehavior && params) {
		        if (newBehavior === null
		                || params === null) {
		            var s = [];
		            s.push("ERROR! IoNpcData.applyPoisonDamage() - ");
		            s.push("null value sent in parameters");
		            throw new Error(s.join(""));
		        }
		        if (isNaN(newBehavior)
		                || parseInt(Number(newBehavior)) !== newBehavior
		                || isNaN(parseInt(newBehavior, 10))) {
		            var s = [];
		            s.push("ERROR! IoNpcData.ARX_NPC_Behaviour_Change() - ");
		            s.push("newBehavior must be an integer");
		            throw new Error(s.join(""));
		        }
		        if (isNaN(params)
		                || parseInt(Number(params)) !== params) {
		            var s = [];
		            s.push("ERROR! IoNpcData.ARX_NPC_Behaviour_Change() - ");
		            s.push("params must be a long integer");
		            throw new Error(s.join(""));
		        }		    	
		        if (hasBehavior(BehaviourGlobals.BEHAVIOUR_FIGHT)
		                && (newBehavior & BehaviourGlobals.BEHAVIOUR_FIGHT
		                        .getFlag()) === BehaviourGlobals.BEHAVIOUR_FIGHT.getFlag()) {
		        	this.stopActiveAnimation();
		            // ANIM_USE * ause1 = &io->animlayer[1];
		            // AcquireLastAnim(io);
		            // FinishAnim(io, ause1->cur_anim);
		            // ause1->cur_anim = NULL;
		        }
		
		        if (this.hasBehavior(BehaviourGlobals.BEHAVIOUR_NONE)
		                && (newBehavior & BehaviourGlobals.BEHAVIOUR_NONE)
		                === BehaviourGlobals.BEHAVIOUR_NONE) {
		            this.stopIdleAnimation();
		            // ANIM_USE * ause0 = &io->animlayer[0];
		            // AcquireLastAnim(io);
		            // FinishAnim(io, ause0->cur_anim);
		            // ause0->cur_anim = NULL;
		            // ANIM_Set(ause0, io->anims[ANIM_DEFAULT]);
		            // ause0->flags &= ~EA_LOOP;
		
		            this.stopActiveAnimation();
		            // ANIM_USE * ause1 = &io->animlayer[1];
		            // AcquireLastAnim(io);
		            // FinishAnim(io, ause1->cur_anim);
		            // ause1->cur_anim = NULL;
		            // ause1->flags &= ~EA_LOOP;
		
		            // stop whatever animation this is
		            // ANIM_USE * ause2 = &io->animlayer[2];
		            // AcquireLastAnim(io);
		            // FinishAnim(io, ause2->cur_anim);
		            // ause2->cur_anim = NULL;
		            // ause2->flags &= ~EA_LOOP;
		        }
		
		        if ((newBehavior & BehaviourGlobals.BEHAVIOUR_FRIENDLY)
		        		=== BehaviourGlobals.BEHAVIOUR_FRIENDLY) {
		        	this.stopIdleAnimation();
		            // ANIM_USE * ause0 = &io->animlayer[0];
		            // AcquireLastAnim(io);
		            // FinishAnim(io, ause0->cur_anim);
		            // ANIM_Set(ause0, io->anims[ANIM_DEFAULT]);
		            // ause0->altidx_cur = 0;
		        }
		        this.clearBehavior();
		        behavior = newBehavior;
		        behavior_param = params;
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.ARX_NPC_Behaviour_Change() - ");
	            s.push("requires 2 parameters");
	            throw new Error(s.join(""));
	        }
	    }
	    this.ARX_NPC_Behaviour_Stack = function() {
	        for (var i = 0; i < MAX_STACKED_BEHAVIOR; i++) {
	            var bd = stacked[i];
	            if (!bd.exists()) {
	                bd.setBehaviour(behavior);
	                bd.setBehaviorParam(behavior_param);
	                bd.setTactics(tactics);
	                // set pathfinding information
	                // if (io->_npcdata->pathfind.listnb > 0)
	                // bd->target = io->_npcdata->pathfind.truetarget;
	                // else
	                // bd->target = io->targetinfo;
	
	                bd.setMovemode(movemode);
	                bd.setExists(true);
	                return;
	            }
	        }
	    }
	    this.ARX_NPC_Behaviour_UnStack = function() {
	        for (var i = 0; i < MAX_STACKED_BEHAVIOR; i++) {
	            var bd = stacked[i];
	            if (bd.exists()) {
	                // AcquireLastAnim(io);
	                behavior = bd.getBehaviour();
	                behavior_param = bd.getBehaviorParam();
	                this.tactics = bd.getTactics();
	                this.targetInfo = bd.getTarget();
	                this.movemode = bd.getMoveMode();
	                bd.setExists(false);
	                // ARX_NPC_LaunchPathfind(io, bd->target);
	
	                if (this.hasBehavior(BehaviourGlobals.BEHAVIOUR_NONE)) {
	                    // memcpy(io->animlayer, bd->animlayer,
	                    // sizeof(ANIM_USE)*MAX_ANIM_LAYERS);
	                }
	            }
	        }
	    }
	    /**
	     * Revives the NPC.
	     * @param reposition if <tt>true</tt> NPC is moved to their initial position
	     * @throws RPGException if an error occurs
	     */
	    this.ARX_NPC_Revive = function(reposition) {
	    	if (reposition
	    			&& reposition !== null) {
		        if (typeof reposition !== "boolean") {
		            var s = [];
		            s.push("ERROR! IoNpcData.ARX_NPC_Revive() - ");
		            s.push("reposition must be a boolean");
		            throw new Error(s.join(""));
		        }
		        // TODO - check if secondary inventory belongs to the NPC
		        // and kill it
		        // if ((TSecondaryInventory) && (TSecondaryInventory->io === io)) {
		        // TSecondaryInventory = NULL;
		        // }
		
		        Script.getInstance().setMainEvent(getIo(), "MAIN");
		
		        this.getIo().removeIOFlag(IoGlobals.IO_07_NO_COLLISIONS);
		        this.restoreLifeToMax();
		        Script.getInstance().resetObject(io, true);
		        this.restoreLifeToMax();
		
		        if (reposition) {
		        	this.moveToInitialPosition();
		        }
		        // reset texture - later
		        // long goretex = -1;
		
		        // for (long i = 0; i < io->obj->nbmaps; i++) {
		        // if (io->obj->texturecontainer
		        // && io->obj->texturecontainer[i]
		        // && (IsIn(io->obj->texturecontainer[i]->m_strName, "GORE"))) {
		        // goretex = i;
		        // break;
		        // }
		        // }
		
		        // for (long ll = 0; ll < io->obj->nbfaces; ll++) {
		        // if (io->obj->facelist[ll].texid !== goretex) {
		        // io->obj->facelist[ll].facetype &= ~POLY_HIDE;
		        // } else {
		        // io->obj->facelist[ll].facetype |= POLY_HIDE;
		        // }
		        // }
		
		        cuts = 0;
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.ARX_NPC_Revive() - ");
	            s.push("requires a parameter");
	            throw new Error(s.join(""));
	        }
	    }
	    /** Clears all behavior flags that were set. */
	    this.clearBehavior = function() {
	        behavior = 0;
	    }
	    /** Clears all NPC flags that were set. */
	    this.clearNPCFlags = function() {
	        npcFlags = 0;
	    }
	    /**
	     * Damages an NPC.
	     * @param dmg the amount of damage
	     * @param srcIoid the source of the damage
	     * @param isSpellDamage flag indicating whether the damage is from a spell
	     * @return {@link float}
	     * @throws RPGException if an error occurs
	     */
	    this.damageNPC = function(dmg, srcIoid, isSpellDamage) {
	        var damagesdone = 0;
	    	if (dmg && srcIoid && isSpellDamage
	    			&& dmg !== null && srcIoid !== null && isSpellDamage !== null) {
			    if (isNaN(dmg)) {
			        var s = [];
		            s.push("ERROR! IoNpcData.damageNPC() - ");
		            s.push("dmg must be floating-point");
		            throw new Error(s.join(""));
			    }
			    if (isNaN(val)
			            || parseInt(Number(val)) !== val
			            || isNaN(parseInt(val, 10))) {
		            s.push("ERROR! IoNpcData.damageNPC() - ");
		            s.push("srcIoid must be integer");
		            throw new Error(s.join(""));
			    }
		        if (typeof isSpellDamage !== "boolean") {
		            var s = [];
		            s.push("ERROR! IoNpcData.damageNPC() - ");
		            s.push("isSpellDamage must be a boolean");
		            throw new Error(s.join(""));
		        }
		        if (io.getShow() > 0
		                && !io.hasIOFlag(IoGlobals.IO_08_INVULNERABILITY)) {
		            if (this.getBaseLife() <= 0) {
		                this.damageNonLivingNPC(dmg, srcIoid, isSpellDamage);
		            } else {
		                // send OUCH event
		                sendOuchEvent(dmg, srcIoid);
		                // TODO - remove Confusion spell when hit
		
		                if (dmg >= 0) {
		                    this.applyPoisonDamage(srcIoid, isSpellDamage);
		                    var accepted = ScriptGlobals.ACCEPT;
		                    // if IO has a script, send HIT event
		                    if (io.getScript() !== null) {
		                        accepted = sendHitEvent(dmg, srcIoid, isSpellDamage);
		                    }
		                    // if HIT event doesn't handle damage, handle it here
		                    if (accepted === ScriptGlobals.ACCEPT) {
		                        damagesdone = processDamage(dmg, srcIoid);
		                    }
		                }
		            }
		        }
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.damageNPC() - ");
	            s.push("requires 3 parameters");
	            throw new Error(s.join(""));
	        }
	        return damagesdone;
	    }
	    /**
	     * Forces the NPC to die.
	     * @param killerIO the IO that killed the NPC
	     * @throws RPGException if an error occurs
	     */
	    this.forceDeath = function(killerIO) {
	    	if (!(killerIO instanceof BaseInteractiveObject)) {
	            var s = [];
	            s.push("ERROR! IoNpcData.forceDeath() - ");
	            s.push("killerIO must be a BaseInteractiveObject");
	            throw new Error(s.join(""));	    		
	    	}
	        if (io.getMainevent() === null
	                || (io.getMainevent() !== null
	                        && !io.getMainevent().toUpperCase() === "DEAD")) {
	            var oldSender = Script.getInstance().getEventSender();
	            Script.getInstance().setEventSender(killerIO);
	
	            // TODO - reset drag IO
	            // if (io === DRAGINTER)
	            // Set_DragInter(NULL);
	
	            // TODO - reset flying over (with mouse) IO
	            // if (io === FlyingOverIO)
	            // FlyingOverIO = NULL;
	
	            // TODO - reset camera 1 when pointing to IO
	            // if ((MasterCamera.exist & 1) && (MasterCamera.io === io))
	            // MasterCamera.exist = 0;
	
	            // TODO - reset camera 2 when pointing to IO
	            // if ((MasterCamera.exist & 2) && (MasterCamera.want_io === io))
	            // MasterCamera.exist = 0;
	
	            // TODO - kill dynamic lighting for IO
	            // if (ValidDynLight(io->dynlight))
	            // DynLight[io->dynlight].exist = 0;
	
	            // io->dynlight = -1;
	
	            // if (ValidDynLight(io->halo.dynlight))
	            // DynLight[io->halo.dynlight].exist = 0;
	
	            // io->halo.dynlight = -1;
	
	            // reset all behaviors
	            this.resetBehavior();
	
	            // TODO - kill speeches
	            // ARX_SPEECH_ReleaseIOSpeech(io);
	
	            // Kill all Timers...
	            Script.getInstance().timerClearByIO(io);
	
	            if (io.getMainevent() === null
	                    || (io.getMainevent() !== null
	                            && !io.getMainevent().toUpperCase() === "DEAD")) {
	                Script.getInstance().notifyIOEvent(io, ScriptGlobals.SM_017_DIE, "");
	            }
	
	            if (Interactive.getInstance().hasIO(io)) {
	                io.setMainevent("DEAD");
	
	                // TODO - kill animations
	                // if (EEDistance3D(&io_dead->pos, &ACTIVECAM->pos) > 3200) {
	                // io_dead->animlayer[0].ctime = 9999999;
	                // io_dead->lastanimtime = 0;
	                // }
	
	                // set killer
	                var killer = "";
	
	                this.setWeaponInHand(-1);
	
	                Interactive.getInstance().ARX_INTERACTIVE_DestroyDynamicInfo(io);
	
	                // set killer name
	                if (killerIO !== null
	                        && killerIO.hasIOFlag(IoGlobals.IO_01_PC)) {
	                    killer = "PLAYER";
	                } else if (killerIO !== null
	                        && killerIO.hasIOFlag(IoGlobals.IO_03_NPC)) {
	                    killer = killerIO.getNPCData().getName();
	                }
	                var i = Interactive.getInstance().getMaxIORefId();
	                for (; i >= 0; i--) {
	                    if (!Interactive.getInstance().hasIO(i)) {
	                        continue;
	                    }
	                    var ioo = Interactive.getInstance().getIO(i);
	                    if (ioo === null) {
	                        continue;
	                    }
	                    if (ioo.equals(io)) {
	                        continue;
	                    }
	                    if (ioo.hasIOFlag(IoGlobals.IO_03_NPC)) {
	                        if (Interactive.getInstance().hasIO(
	                                ioo.getTargetinfo())) {
	                            if (Interactive.getInstance().getIO(
	                                    ioo.getTargetinfo()).equals(io)) {
	                                Script.getInstance().setEventSender(io);
	                                Script.getInstance().stackSendIOScriptEvent(ioo,
	                                        0,
	                                        { "killer": killer },
	                                        "onTargetDeath");
	                                ioo.setTargetinfo(IoGlobals.TARGET_NONE);
	                                ioo.getNPCData().setReachedtarget(false);
	                            }
	                        }
	                        // TODO - handle pathfinding target cleanup
	                        // if (ValidIONum(ioo->_npcdata->pathfind.truetarget)) {
	                        // if (inter.iobj[ioo->_npcdata->pathfind.truetarget] ==
	                        // io_dead) {
	                        // EVENT_SENDER = io_dead;
	                        // Stack_SendIOScriptEvent(inter.iobj[i], 0, killer,
	                        // "TARGET_DEATH");
	                        // ioo->_npcdata->pathfind.truetarget = TARGET_NONE;
	                        // ioo->_npcdata->reachedtarget = 0;
	                        // }
	                        // }
	                    }
	                }
	
	                // TODO - kill animations
	                // IO_UnlinkAllLinkedObjects(io_dead);
	                // io_dead->animlayer[1].cur_anim = NULL;
	                // io_dead->animlayer[2].cur_anim = NULL;
	                // io_dead->animlayer[3].cur_anim = NULL;
	
	                // reduce life to 0
	                this.adjustLife(-99999);
	
	                if (this.getWeapon() !== null) {
	                    var wpnIO = getWeapon();
	                    if (Interactive.getInstance().hasIO(wpnIO)) {
	                        wpnIO.setShow(IoGlobals.SHOW_FLAG_IN_SCENE);
	                        wpnIO.addIOFlag(IoGlobals.IO_07_NO_COLLISIONS);
	                        // TODO - reset positioning and velocity
	                        // ioo->pos.x =
	                        // ioo->obj->vertexlist3[ioo->obj->origin].v.x;
	                        // ioo->pos.y =
	                        // ioo->obj->vertexlist3[ioo->obj->origin].v.y;
	                        // ioo->pos.z =
	                        // ioo->obj->vertexlist3[ioo->obj->origin].v.z;
	                        // ioo->velocity.x = 0.f;
	                        // ioo->velocity.y = 13.f;
	                        // ioo->velocity.z = 0.f;
	                        // ioo->stopped = 0;
	                    }
	                }
	            }
	            Script.getInstance().setEventSender(oldSender);
	        }
	    }
	    /**
	     * Gets the armorClass
	     * @return {@link float}
	     */
	    this.getArmorClass = function() {
	        return armorClass;
	    }
	    /**
	     * Gets the {@link IoNpcData}'s gender.
	     * @return int
	     */
	    this.getGender = function() {
	        return gender;
	    }
	    /**
	     * Gets the IO associated with this {@link IoNpcData}.
	     * @return {@link IO}
	     */
	    this.getIo = function() {
	        return io;
	    }
	    /**
	     * Gets the value for the movemode.
	     * @return {@link int}
	     */
	    this.getMovemode = function() {
	        return movemode;
	    }
	    /**
	     * Gets the {@link IoNpcData}'s name.
	     * @return char[]
	     */
	    this.getName = function() {
	        return name;
	    }
	    this.getPathfinding = function() {
	        return pathfinder;
	    }
	    /**
	     * Gets the splatDamages
	     * @return {@link int}
	     */
	    this.getSplatDamages = function() {
	        return splatDamages;
	    }
	    /**
	     * Gets the splatTotNb
	     * @return {@link int}
	     */
	    this.getSplatTotNb = function() {
	        return splatTotNb;
	    }
	    /**
	     * Gets the value for the tactics.
	     * @return {@link int}
	     */
	    this.getTactics = function() {
	        return tactics;
	    }
	    /**
	     * Gets the {@link IoNpcData}'s title.
	     * @return char[]
	     */
	    this.getTitle = function() {
	        return title;
	    }
	    /**
	     * Gets the NPC's weapon.
	     * @return {@link IO}
	     */
	    this.getWeapon = function() {
	        return weapon;
	    }
	    /**
	     * Gets the value for the weaponInHand.
	     * @return {@link int}
	     */
	    this.getWeaponInHand = function() {
	        return weaponInHand;
	    }
	    /**
	     * Gets the value for the xpvalue.
	     * @return {@link int}
	     */
	    this.getXpvalue = function() {
	        return xpvalue;
	    }
	    /**
	     * Determines if the {@link IoNpcData} has a specific behavior flag.
	     * @param flag the flag
	     * @return true if the {@link IoNpcData} has the flag; false
	     *         otherwise
	     */
	    this.hasBehavior = function(flag) {
	        if (flag
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
		        return (behavior & flag) === flag;
	        } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.hasBehavior() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * Determines if the {@link IoNpcData} has a specific flag.
	     * @param flag the flag
	     * @return true if the {@link IoNpcData} has the flag; false otherwise
	     */
	    this.hasNPCFlag = function(flag) {
	        if (flag
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
		        return (npcFlags & flag) === flag;
	        } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.hasNPCFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * Gets the value for the reachedtarget.
	     * @return {@link long}
	     */
	    this.hasReachedtarget = function() {
	        return reachedtarget;
	    }
	    /**
	     * Heals an NPC for a specific amount.
	     * @param healAmt the healing amount
	     */
	    this.healNPC = function(healAmt) {
		    if (healAmt
		    		&& healAmt !== null
		    		&& !isNaN(healAmt)) {
		        if (this.getBaseLife() > 0) {
		            if (healAmt > 0) {
		                this.adjustLife(healAmt);
		            }
		        }
		    } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.healNPC() - ");
	            s.push("argument must be floating-point");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Determines if an NPC is dead.
	     * @return <tt>true</tt> if the NPC is dead; <tt>false</tt> otherwise
	     */
	    this.IsDeadNPC = function() {
	        var dead = false;
	        if (!this.hasLifeRemaining()) {
	            dead = true;
	        }
	        if (!dead
	                && io.getMainevent() !== null
	                && io.getMainevent().toUpperCase() === "DEAD") {
	            dead = true;
	        }
	        return dead;
	    }
	    /**
	     * @param dmg
	     * @param srcIoid
	     * @return
	     * @throws RPGException
	     */
	    processDamage = function(dmg, srcIoid) {
	        var damagesdone = 0;
	    	if (dmg && srcIoid && dmg !== null && srcIoid !== null) {
			    if (isNaN(dmg)) {
			        var s = [];
		            s.push("ERROR! IoNpcData.processDamage() - ");
		            s.push("dmg must be floating-point");
		            throw new Error(s.join(""));
			    }
			    if (isNaN(srcIoid)
			            || parseInt(Number(srcIoid)) !== srcIoid
			            || isNaN(parseInt(val, 10))) {
		            var s = [];
			        s.push("ERROR! IoNpcData.processDamage() - ");
		            s.push("srcIoid must be integer");
		            throw new Error(s.join(""));
			    }
		        damagesdone = Math.min(dmg, getBaseLife());
		        this.adjustLife(-dmg);
		        if (this.getBaseLife() <= 0) { // NPC is dead
		            // base life should be 0
		            if (Interactive.getInstance().hasIO(srcIoid)) {
		                var xp = xpvalue;
		                var srcIO = Interactive.getInstance().getIO(srcIoid);
		                this.forceDeath(srcIO);
		                if (srcIO.hasIOFlag(IoGlobals.IO_01_PC)) {
		                	this.awardXpForNpcDeath(xp, srcIO);
		                }
		            } else {
		            	this.forceDeath(null);
		            }
		        }	    		
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.processDamage() - ");
	            s.push("requires 2 arguments");
	            throw new Error(s.join(""));
		    }
	        return damagesdone;
	    }
	    /**
	     * Removes a behavior flag.
	     * @param flag the flag
	     */
	    this.removeBehavior = function(flag) {
	        if (flag
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
		        behavior &= ~flag;
	        } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.removeBehavior() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * Removes an NPC flag.
	     * @param flag the flag
	     */
	    this.removeNPCFlag = function(flag) {
	        if (flag
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
	        	npcFlags &= ~flag;
	        } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.removeNPCFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /** Resets the behavior. */
	    this.resetBehavior = function() {
	        behavior = BehaviourGlobals.BEHAVIOUR_NONE;
	        for (var i = 0; i < MAX_STACKED_BEHAVIOR; i++) {
	            if (stacked[i] === null) {
	                stacked[i] = new BehaviourData();
	            }
	            stacked[i].setExists(false);
	        }
	    }
	    /**
	     * Sends the NPC IO a 'Hit' event.
	     * @param dmg the amount of damage
	     * @param srcIoid the source of the damage
	     * @param isSpellDamage flag indicating whether the damage is from a spell
	     * @throws RPGException if an error occurs
	     */
	    var sendHitEvent = function(dmg, srcIoid, isSpellDamage) {
	    	if (dmg && srcIoid && isSpellDamage
	    			&& dmg !== null && srcIoid !== null && isSpellDamage !== null) {
			    if (isNaN(dmg)) {
			        var s = [];
		            s.push("ERROR! IoNpcData.sendHitEvent() - ");
		            s.push("dmg must be floating-point");
		            throw new Error(s.join(""));
			    }
			    if (isNaN(srcIoid)
			            || parseInt(Number(srcIoid)) !== srcIoid
			            || isNaN(parseInt(srcIoid))) {
			        var s = [];
		            s.push("ERROR! IoNpcData.sendHitEvent() - ");
		            s.push("srcIoid must be integer");
		            throw new Error(s.join(""));
			    }
		        if (typeof isSpellDamage !== "boolean") {
		            var s = [];
		            s.push("ERROR! IoNpcData.sendHitEvent() - ");
		            s.push("isSpellDamage must be a boolean");
		            throw new Error(s.join(""));
		        }
		        if (Interactive.getInstance().hasIO(srcIoid)) {
		            Script.getInstance().setEventSender(
		                    Interactive.getInstance().getIO(srcIoid));
		        } else {
		            Script.getInstance().setEventSender(null);
		        }
		
		        var params;
		        if (Script.getInstance().getEventSender() !== null
		                && Script.getInstance().getEventSender().hasIOFlag(IoGlobals.IO_01_PC)) {
		            var plrIO = Script.getInstance().getEventSender();
		            if (isSpellDamage) {
		                params = [{ "SPELL_DMG": dmg }];
		            } else {
		                var wpnId =
		                	plrIO.getPCData().getEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON);
		                var wpnIO = Interactive.getInstance().getIO(wpnId);
		                var wpnType = EquipmentGlobals.WEAPON_BARE;
		                if (wpnIO !== null) {
		                    wpnType = wpnIO.getItemData().getWeaponType();
		                }
		                switch (wpnType) {
		                case EquipmentGlobals.WEAPON_BARE:
		                    params = [{ "BARE_DMG": dmg }];
		                    break;
		                case EquipmentGlobals.WEAPON_DAGGER:
		                    params = [{ "DAGGER_DMG": dmg }];
		                    break;
		                case EquipmentGlobals.WEAPON_1H:
		                    params = [{ "1H_DMG": dmg }];
		                    break;
		                case EquipmentGlobals.WEAPON_2H:
		                    params = [{ "2H_DMG": dmg }];
		                    break;
		                case EquipmentGlobals.WEAPON_BOW:
		                    params = [{ "ARROW_DMG": dmg }];
		                    break;
		                default:
		                    params = [{ "DMG": dmg }];
		                    break;
		                }
		                wpnIO = null;
		            }
		            plrIO = null;
		        } else {
		            params = [{ "DMG": dmg }];
		        }
		        // if player summoned object causing damage,
		        // change event sender to player
		        if (summonerIsPlayer(Script.getInstance().getEventSender())) {
		            var summonerIO = Interactive.getInstance().getIO(
		            		Script.getInstance().getEventSender().getSummoner());
		            Script.getInstance().setEventSender(summonerIO);
		            summonerIO = null;
		            params = [{ "SUMMONED_DMG": dmg }];
		        } else {
		            params = [{ "SUMMONED_OUCH": 0 }, { "OUCH": io.getDamageSum() }];
		        }
		        return Script.getInstance().sendIOScriptEvent(
		                io, ScriptGlobals.SM_016_HIT, params, null);
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.sendHitEvent() - ");
	            s.push("requires 3 parameters");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * Sends the NPC IO an 'Ouch' event.
	     * @param dmg the amount of damage
	     * @param srcIoid the source of the damage
	     * @throws RPGException if an error occurs
	     */
	    var sendOuchEvent = function(dmg, srcIoid) {
	    	if (dmg && srcIoid
	    			&& dmg !== null && srcIoid !== null) {
			    if (isNaN(dmg)) {
			        var s = [];
		            s.push("ERROR! IoNpcData.sendOuchEvent() - ");
		            s.push("dmg must be floating-point");
		            throw new Error(s.join(""));
			    }
			    if (isNaN(srcIoid)
			            || parseInt(Number(srcIoid)) !== srcIoid
			            || isNaN(parseInt(srcIoid, 10))) {
		            s.push("ERROR! IoNpcData.sendOuchEvent() - ");
		            s.push("srcIoid must be integer");
		            throw new Error(s.join(""));
			    }
		        io.setDamageSum(io.getDamageSum() + dmg);
		        // set the event sender
		        if (Interactive.getInstance().hasIO(srcIoid)) {
		            Script.getInstance().setEventSender(
		                    Interactive.getInstance().getIO(srcIoid));
		        } else {
		            Script.getInstance().setEventSender(null);
		        }
		        // check to see if the damage is coming from a summoned object
		        var params;
		        if (summonerIsPlayer(Script.getInstance().getEventSender())) {
		            params = [{ "SUMMONED_OUCH": io.getDamageSum() }, { "OUCH": 0 }];
		        } else {
		            params = [{ "SUMMONED_OUCH": 0 }, { "OUCH": io.getDamageSum() }];
		        }
		        Script.getInstance().sendIOScriptEvent(io, ScriptGlobals.SM_045_OUCH, params, null);
		        io.setDamageSum(0);
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.sendOuchEvent() - ");
	            s.push("requires 2 parameters");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * Sets the armorClass
	     * @param val the armorClass to set
	     */
	    this.setArmorClass = function(val) {
		    if (val
		    		&& val !== null
		    		&& !isNaN(val)) {
		        armorClass = val;
		    } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setArmorClass() - ");
	            s.push("argument must be floating-point");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the {@link IoNpcData}'s gender.
	     * @param val the gender to set
	     */
	    this.setGender = function(val) {
		    if (val
		    		&& val !== null
		    		&& val instanceof Gender) {
		        gender = val;
		        this.notifyWatchers();
		    } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setGender() - ");
	            s.push("argument must be Gender");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the IO associated with this {@link IoNpcData}.
	     * @param newIO the IO to set
	     */
	    this.setIo = function(val) {
		    if (val
		    		&& val !== null
		    		&& val instanceof BaseInteractiveObject) {
		        io = newIO;
		    } else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setIo() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the value of the movemode.
	     * @param val the new value to set
	     */
	    this.setMovemode = function(val) {
	    	if (val
	    			&& val !== null
	    			&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		        movemode = val;
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setMovemode() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
	    	}
	    }
	    /**
	     * Sets the {@link IoPcData}'s name.
	     * @param val the name to set
	     */
	    this.setName = function(val) {
	    	if (val && val !== null && typeof val === "string") {
		        name = val;
		        notifyWatchers();
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setName() - ");
	            s.push("argument must be string");
	            throw new Error(s.join(""));
	    	}
	    }
	    /**
	     * Sets the value of the reachedtarget.
	     * @param val the new value to set
	     */
	    this.setReachedtarget = function(val) {
	    	if (val && val !== null && typeof val === "boolean") {
	    		reachedtarget = val;
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setName() - ");
	            s.push("argument must be boolean");
	            throw new Error(s.join(""));
	    	}
	    }
	    /**
	     * Sets the splatDamages
	     * @param splatDamages the splatDamages to set
	     */
	    this.setSplatDamages = function(val) {
	    	if (val
	    			&& val !== null
	    			&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
	    		splatDamages = val;
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setSplatDamages() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
	    	}
	    }
	    /**
	     * Sets the splatTotNb
	     * @param splatTotNb the splatTotNb to set
	     */
	    this.setSplatTotNb = function(val) {
	    	if (val
	    			&& val !== null
	    			&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
	    		splatTotNb = val;
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setSplatTotNb() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
	    	}
	    }
	    /**
	     * Sets the value of the tactics.
	     * @param val the new value to set
	     */
	    this.setTactics = function(val) {
	    	if (val
	    			&& val !== null
	    			&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
	    		tactics = val;
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setTactics() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
	    	}
	    }
	    /**
	     * Sets the {@link IoPcData}'s title.
	     * @param val the title to set
	     */
	    this.setTitle = function(val) {
	    	if (val
	    			&& val !== null
	    			&& typeof val === "string") {
		        title = val;
		        notifyWatchers();
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setTitle() - ");
	            s.push("argument must be string");
	            throw new Error(s.join(""));
	    	}
	    }
	    /**
	     * Sets the NPC's weapon.
	     * @param wpnIO the weapon to set
	     */
	    this.setWeapon = function(wpnIO) {
	    	if (val
	    			&& val !== null
	    			&& val instanceof BaseInteractiveObject) {
		        weapon = wpnIO;
		        if (weapon !== null) {
		            weaponInHand = weapon.getRefId();
		        } else {
		            weaponInHand = -1;
		        }
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setWeapon() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
	    	}
	    }
	    /**
	     * Sets the value of the weaponInHand.
	     * @param ioid the new value to set
	     * @throws RPGException if an error occurs
	     */
	    this.setWeaponInHand = function(ioid) {
	    	if (ioid
	    			&& ioid !== null
	    			&& !isNaN(ioid)
		            && parseInt(Number(ioid)) === ioid
		            && !isNaN(parseInt(ioid, 10))) {
		        weaponInHand = ioid;
		        if (Interactive.getInstance().hasIO(weaponInHand)) {
		            weapon = Interactive.getInstance().getIO(weaponInHand);
		        } else {
		            weapon = null;
		        }
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setWeaponInHand() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
	    	}
	    }
	    /**
	     * Sets the value of the xpvalue.
	     * @param val the new value to set
	     */
	    this.setXpvalue = function(val) {
	    	if (val
	    			&& val !== null
	    			&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		        xpvalue = val;
	    	} else {
	            var s = [];
	            s.push("ERROR! IoNpcData.setXpvalue() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
	    	}
	    }
	    /**
	     * Determines if a summoned IO's summoner is a PC.
	     * @param io the IO
	     * @return <tt>true</tt> if the summoner is a player; <tt>false</tt>
	     *         otherwise
	     * @throws RPGException if an error occurs
	     */
	    var summonerIsPlayer = function(io) {
	        var isPlayer = false;
	    	if (io
	    			&& io !== null
	    			&& io instanceof BaseInteractiveObject) {
	            var summonerId = io.getSummoner();
	            if (Interactive.getInstance().hasIO(summonerId)) {
	            	var summoner = Interactive.getInstance().getIO(summonerId);
	                if (summoner.hasIOFlag(IoGlobals.IO_01_PC)) {
	                    isPlayer = true;
	                }
	                summoner = null;
	            }
	    	}
	        return isPlayer;
	    }
	}
	IoNpcData.MAX_STACKED_BEHAVIOR = 5;
	IoNpcData.prototype = Object.create(IOCharacter.prototype);
	return IoNpcData;
});