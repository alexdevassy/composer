/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const TransactionDeclaration = require('../../lib/introspect/transactiondeclaration');
const ClassDeclaration = require('../../lib/introspect/classdeclaration');
const ModelFile = require('../../lib/introspect/modelfile');
const ModelManager = require('../../lib/modelmanager');

require('chai').should();
const sinon = require('sinon');

describe('TransactionDeclaration', () => {

    let mockModelManager;
    let mockSystemTransaction;
    let mockClassDeclaration;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        mockModelManager =  sinon.createStubInstance(ModelManager);
        mockSystemTransaction = sinon.createStubInstance(TransactionDeclaration);
        mockSystemTransaction.getFullyQualifiedName.returns('org.hyperledger.composer.system.Transaction');
        mockModelManager.getSystemTypes.returns([mockSystemTransaction]);
        mockClassDeclaration = sinon.createStubInstance(ClassDeclaration);
        mockModelManager.getType.returns(mockClassDeclaration);
        mockClassDeclaration.getProperties.returns([]);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('#validate', () => {
        it('should throw error name is Transaction', () => {
            const model = `
            namespace com.test

            transaction Transaction identified by transactionId {
                o String transactionId
            }`;

            const modelFile = new ModelFile(mockModelManager, model);
            const p = modelFile.getTransactionDeclarations()[0];

            (() => {
                p.validate();
            }).should.throw(/Transaction is a reserved type name./);
        });
    });

});